const { apiGetOwnerById, apiGetAllOwners, apiCreateOwner, apiUpdateOwner, apiDeleteOwner } = require("../controllers/owners.controller");
const express = require("express");
const router = express.Router()

router.get("/owners", apiGetAllOwners);
router.post("/owners", apiCreateOwner);
router.get("/owners/:owner_id", apiGetOwnerById);
router.put("/owners/:owner_id", apiUpdateOwner)
router.delete("/owners/:owner_id", apiDeleteOwner);

module.exports = router