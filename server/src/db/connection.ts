import { Sequelize } from "sequelize";

require('dotenv').config();
const url = process.env.DATABASE_URL || "";
const sequelize = new Sequelize(url);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


export { sequelize }

