const express = require("express");
const { getAllOwners, createOwner, getOwnerById, updateOwnerById, deleteOwnerById } = require("../controllers/owners.controller");
const router = express.Router();

router.get("/", getAllOwners);
router.post("/", createOwner);
router.get("/:ownerId", getOwnerById);
router.put("/:ownerId", updateOwnerById);
router.delete("/:ownerId", deleteOwnerById);

module.exports = {
  ownersRoutes: router,
};
