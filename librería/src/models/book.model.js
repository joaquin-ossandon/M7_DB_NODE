const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Book = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = { Book };