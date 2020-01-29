const models = require('./models');

module.exports = async () => {
  try {
    await models.sequelize.sync({ force: true });
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  } catch (err) {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  }
};
