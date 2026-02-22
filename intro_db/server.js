const petsRoutes = require("./src/routes/pets.route");
const ownersRoutes = require("./src/routes/owners.route")
const express = require("express");
const app = express();

app.use(petsRoutes)
app.use(ownersRoutes)

module.exports = { app };
