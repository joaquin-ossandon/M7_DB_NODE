const { pool } = require("../config/db");
const errorCodesDataBase = require("../utils/errorCodes");

const getAllPets = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM pets");

    res.json({ mascotas: rows });
  } catch (error) {
    console.log(error);
    res.json({
      error: errorCodesDataBase(error.code),
    });
  } finally {
    console.log("SIEMPRE ME VOY A EJECUTAR");
  }
};

const getPetById = async (req, res) => {
  const { id: pet_id } = req.params;

  try {
    const { rowCount, rows: petInfo } = await pool.query({
      text: "SELECT * FROM pets WHERE pet_id = $1",
      values: [pet_id],
    });

    if(!rowCount) {
        throw new Error(`No hay una mascota con el id ${pet_id}`);
    }

    const owner_id = petInfo[0].owner_id;

    const { rows: ownerInfo } = await pool.query({
      text: "SELECT * FROM owners WHERE owner_id = $1",
      values: [owner_id],
    });

    res.json({
      pet: { ...petInfo[0], owner: ownerInfo[0] },
    });
  } catch (error) {
    console.log(error)
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllPets,
  getPetById,
};
