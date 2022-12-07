import * as dotenv from "dotenv";
const { Sequelize, DataTypes } = require('sequelize');
import { expenseModel } from './expenses';
import { userModel } from './user';
import { categoryModel } from './category';
import { createClient } from 'redis';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {});

const userTable = userModel(sequelize, DataTypes);
const expenseTable = expenseModel(sequelize, DataTypes);
const categoryTable = categoryModel(sequelize, DataTypes);


////////////relations/////////////////////////////////////

userTable.hasOne(categoryTable, { foreignKey: 'user_id' });
categoryTable.belongsTo(userTable, { foreignKey: 'user_id' });

userTable.hasOne(expenseTable, { foreignKey: 'user_id' });
expenseTable.belongsTo(userTable, { foreignKey: 'user_id' });

categoryTable.hasOne(expenseTable, { foreignKey: 'category_id' });
expenseTable.belongsTo(categoryTable, { foreignKey: 'category_id' });

////////////relations/////////////////////////////////////


const client = createClient();
client.on('error', async function (error: any) {
  console.error(error);
});

export {
  expenseTable,
  userTable,
  categoryTable,
  sequelize,
  client
}

