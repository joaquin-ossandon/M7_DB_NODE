const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Pet = sequelize.define("pets", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  species: {
    type: DataTypes.STRING,
  },
});

module.exports = { Pet };
