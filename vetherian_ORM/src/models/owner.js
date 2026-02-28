const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { Pet } = require("./pet");

const Owner = sequelize.define(
    "owners", 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        }
    }
)

// Owner.hasMany(Pet)

module.exports = { Owner }