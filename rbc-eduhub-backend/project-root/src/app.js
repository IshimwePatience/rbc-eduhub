const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const setupPassport = require('./config/passport');
const { connectDB, sequelize } = require('./config/database');
const session = require('express-session');

const app = express();

app.use(helmet());
// CORS: allow requests from the frontend origin (set FRONTEND_ORIGIN in env),
// default to Vite dev server at http://localhost:5173. Allow credentials if needed.
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
console.log('ℹ️ Allowing CORS from:', frontendOrigin);
app.use(cors({ origin: frontendOrigin, credentials: true }));
// Removed: app.options('*', cors(...)) - already handled by app.use(cors(...))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using HTTPS
}));

// Initialize passport strategies (if configured)
try {
  setupPassport();
  app.use(passport.initialize());
  console.log('✅ Passport initialized');
} catch (e) {
  console.warn('⚠️ Passport setup skipped or failed:', e.message || e);
}
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// AI proxy route (server-side; uses GEMINI_API_KEY from backend .env)
const aiRoutes = require('./routes/ai.routes');
app.use('/api/ai', aiRoutes);

const { notFound, errorHandler } = require('./middleware/error.middleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

/**
 * Start server. By default the app attempts to connect to DB and sync models.
 * If you only need the AI endpoint (no DB), set SKIP_DB=true in env to skip DB connection/sync.
 */
const startServer = async () => {
  try {
    const skipDb = String(process.env.SKIP_DB || process.env.SKIP_DATABASE || '').toLowerCase() === 'true';

    if (!skipDb) {
      await connectDB();

      // load models (only required if DB features are used)
      const models = require('./model');
      console.log('✅ Models loaded');

      try {
        // Use force:true ONCE to drop all tables and recreate (dangerous) — controlled by env
        const forceSync = String(process.env.FORCE_DB_SYNC || '').toLowerCase() === 'true';
        await sequelize.sync({ force: forceSync });
        console.log('✅ All tables synced');
      } catch (syncErr) {
        // Log sync errors but continue startup so non-DB features (like AI) remain available
        console.error('⚠️ DB sync failed (continuing):', syncErr.message || syncErr);
      }
    } else {
      console.log('ℹ️ SKIP_DB=true — skipping database connect and sync. AI endpoints available.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();