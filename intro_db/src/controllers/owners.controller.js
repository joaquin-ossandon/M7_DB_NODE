const { ZodError } = require("zod");
const {
  getOwnerById,
  getAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} = require("../models/owners.models");
const { createOwnerSchema } = require("../schemas/owners.schema");

const apiGetAllOwners = async (req, res) => {
  try {
    const owners = await getAllOwners();

    res.json({ owners });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const apiGetOwnerById = async (req, res) => {
  const { owner_id } = req.params;
  try {
    const result = await getOwnerById(owner_id);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

const apiCreateOwner = async (req, res) => {
  const user = req.body; // app -> express.urlencode() -> para que entienda lo que viene en los forms y tengamos acceso al req.body.
  // app -> express.json() -> para que entienda cuando se entrega información de texto plano en formato json a nuestro servidor... habilita también acceso a req.body

  // JSON.stringify({hola: "valor"}) -> "{"hola": "valor"}"
  // const trimmedName = name.trim()
  // const trimmedPhone = phone.trim()

  user.name = user.name?.trim();
  user.phone = user.phone?.trim();

  try {
    createOwnerSchema.parse(user);
    const { name, phone } = user;
    const result = createOwner(name, phone);

    res.json({
      success: true,
      owner: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.format(),
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
};

const apiUpdateOwner = async (req, res) => {
  const { owner_id } = req.params;
  const { name, phone } = req.body;

  try {
    const result = await updateOwner(owner_id, name, phone);

    res.json({
      success: true,
      owner: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const apiDeleteOwner = async (req, res) => {
  const { owner_id } = req.params;

  try {
    const result = await deleteOwner(owner_id);

    res.json({
      success: true,
      owner: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  apiGetAllOwners,
  apiGetOwnerById,
  apiCreateOwner,
  apiUpdateOwner,
  apiDeleteOwner,
};
