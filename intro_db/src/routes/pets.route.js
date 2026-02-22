const { getAllPets, getPetById } = require("../controllers/pets.controller");
const express = require("express");
const router = express.Router()

router.get("/pets", getAllPets);
router.get("/pets/:id", getPetById);

module.exports = router