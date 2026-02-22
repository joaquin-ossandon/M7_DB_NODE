const { getAllOwners, getOwnerById } = require("../controllers/owners.controller");
const express = require("express");
const router = express.Router()

router.get("/owners", getAllOwners);
router.get("/owners/:owner_id", getOwnerById);

module.exports = router