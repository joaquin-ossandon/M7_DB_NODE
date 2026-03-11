const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Author = sequelize.define("Author", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
})

module.exports = { Author };