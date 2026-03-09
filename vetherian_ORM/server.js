const express = require("express");
const server = express();

const { petsRoutes } = require("./src/routes/petsRoutes");
const { ownersRoutes } = require("./src/routes/ownersRoutes");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api/pets", petsRoutes);
server.use("/api/owners", ownersRoutes);
server.get("/", (req, res) => {
    res.send("<h1>Hola mundo</h1>")
})

module.exports = server;
