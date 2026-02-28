const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

// server.use(petRoutes)

module.exports = { server };
