const petsRoutes = require("./src/routes/pets.route");
const ownersRoutes = require("./src/routes/owners.route")
const express = require("express");
const app = express();

app.use(express.json()) // -> habilite el req.body cuando le envío texto en formato JSON
app.use(express.urlencoded()) // -> habilite req.body cuando envío información desde un formulario (con method POST)

app.use(petsRoutes)
app.use(ownersRoutes)

module.exports = { app };
