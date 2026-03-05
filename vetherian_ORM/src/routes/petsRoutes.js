const express = require("express")
const { getAllPets, createPet, getPetById, updatePetById, deletePetById } = require("../controllers/pets.controller")
const router = express.Router()

router.get("/", getAllPets)
router.post("/", createPet)
router.get("/:petId", getPetById)
router.put("/:petId", updatePetById)
router.delete("/:petId", deletePetById)

module.exports = {
    petsRoutes: router
}