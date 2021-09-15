const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/dbConnection'); 

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})