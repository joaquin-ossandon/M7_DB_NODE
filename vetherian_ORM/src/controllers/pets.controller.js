const { Op } = require("sequelize");
const { Pet } = require("../models");

const getAllPets = async (req, res) => {
  const { bt, name="" } = req.query; // pets?gt=6 => greater than || bt => between 1,6

  const between = bt.split(",");

  const pets = await Pet.findAll({
    where: {
      [Op.and]: [
        {
          age: {[Op.between]: between},
          name: {[Op.like]: `%${name}%`}
        }
      ],
    },
  });

  res.json(pets);
};

const createPet = (req, res) => {};

const getPetById = (req, res) => {};

const updatePetById = (req, res) => {};

const deletePetById = (req, res) => {};

module.exports = {
  getAllPets,
  createPet,
  getPetById,
  updatePetById,
  deletePetById,
};
