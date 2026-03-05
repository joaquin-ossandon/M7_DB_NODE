const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Owner = sequelize.define("owners", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

module.exports = { Owner };
