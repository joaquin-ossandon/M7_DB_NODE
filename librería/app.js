require("dotenv").config();
const server = require("./server");
const sequelize = require("./src/config/database");
const { Author, Book, Category } = require("./src/models");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    sequelize.sync({ alter: true })
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});