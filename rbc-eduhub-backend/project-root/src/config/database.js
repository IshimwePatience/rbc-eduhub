const { Sequelize } = require('sequelize');

// PostgreSQL Connection
const sequelize = new Sequelize('rbc_eduhub_db', 'postgres', 'Patience123@', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: console.log, // ← Turn on logging to see what's happening
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: false
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected Successfully');
    
    // DON'T sync here - move it to app.js AFTER models are loaded
    console.log('✅ Database Ready');
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB
};