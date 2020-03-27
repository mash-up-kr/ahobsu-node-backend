import { Sequelize } from 'sequelize';
import configDate from '../config/config';

const env = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';
const config = configDate[env];

// let sequelize;
// if (config.use_env_variable) {
// sequelize = new Sequelize(process.env[config.use_env_variable], config.options);
// } else {
const sequelize = new Sequelize(config.database, config.username!, config.password!, config);
// }
export { sequelize };
export default sequelize;
