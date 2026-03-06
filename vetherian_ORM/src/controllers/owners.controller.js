const { Owner } = require("../models");

// C -> Create
const createOwner = async (req, res) => {
  try {
    const { phone, name, pets = [] } = req.body;

    const createdOwner = await Owner.create(
      {
        name,
        phone,
        pets,
      },
      {
        include: {
          association: "pets",
        },
      },
    );

    res.json(createdOwner);
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};
// R -> Read
const getAllOwners = async (req, res) => {
  const { pagina = 1 } = req.query; // localhost:4000/api/owners?pagina=1
  const LIMIT = 10; // límite de resultados en la DB (10 registros)
  const OFFSET = LIMIT * pagina - LIMIT; // cantidad de elementos que se mueve para mostrar los 10 siguientes

  try {
    const allOwners = await Owner.findAll({
      attributes: ["name", "phone"],
      include: {
        association: "pets",
        attributes: ["name", "species"],
      },
      limit: LIMIT,
      offset: OFFSET,
    });

    res.json(allOwners);
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

const getOwnerById = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const owner = await Owner.findByPk(ownerId, {
      attributes: ["name", "phone"],
      include: {
        association: "pets",
        attributes: ["name", "species"],
      },
    });

    res.json({
      owner,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

// U -> Update
const updateOwnerById = async (req, res) => {
  const { ownerId } = req.params;
  const { name, phone } = req.body;

  try {
    const updatedOwner = await Owner.update(
      {
        name,
        phone,
      },
      {
        where: {
          id: ownerId,
        },
        returning: true,
      },
    );

    res.json(updatedOwner[1][0]);
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

// D -> Delete
const deleteOwnerById = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const foundOwner = await Owner.findByPk(ownerId);

    await foundOwner.destroy();

    res.json({
      deletedOwner: foundOwner,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllOwners,
  createOwner,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
};
