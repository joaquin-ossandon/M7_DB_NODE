const { getAllOwners, getOwnerById, createOwner } = require("../controllers/owners.controller");
const express = require("express");
const router = express.Router()

router.get("/owners", getAllOwners);
router.post("/owners", createOwner);
router.get("/owners/:owner_id", getOwnerById);


module.exports = router