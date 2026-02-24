const Cursor = require("pg-cursor");
const { pool } = require("../config/db");
const errorCodesDataBase = require("../utils/errorCodes");

const getAllPets = async (req, res) => {
  const { age, species } = req.query;

  try {
    const { rows } = await pool.query({
      text: "SELECT * FROM pets WHERE ($1::int IS NULL OR age = $1) AND ($2::varchar IS NULL OR species = $2)",
      values: [age, species],
    });
    return res.json({ mascotas: rows });
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

    if (!rowCount) {
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
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

const generateReport = async (req, res) => {
  const client = await pool.connect();
  const sql = "SELECT species FROM pets";
  const cursor = client.query(new Cursor(sql));

  try {
    let lectura;
    let species = {};

    do {
      lectura = await cursor.read(10);

      lectura.forEach((pet) => {
        if (!species[pet.species]) {
          species[pet.species] = 1;
        } else {
          species[pet.species] += 1;
        }
      });
    } while (lectura.length > 0);

    res.json({ species });
  } catch (error) {
    console.error(error);
  } finally {
    await cursor.close();
    client.release();
  }
};

module.exports = {
  getAllPets,
  getPetById,
  generateReport,
};
