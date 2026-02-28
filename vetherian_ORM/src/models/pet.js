const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { Owner } = require("./owner");

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

// Pet.belongsTo(Owner);

module.exports = { Pet };
