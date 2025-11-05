const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB, sequelize } = require('./config/database');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const { notFound, errorHandler } = require('./middleware/error.middleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    
    const models = require('./model');
    console.log('✅ Models loaded');

    // Use force:true ONCE to drop all tables and recreate
    await sequelize.sync({ force: true });
    console.log('✅ All tables synced');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed:', err);
    process.exit(1);
  }
};

startServer();