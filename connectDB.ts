import { sequelize } from './models';

export default async () => {
  const force = process.env.NODE_ENV === 'test';
  try {
    await sequelize.sync({ force });
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  } catch (err) {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  }
};
