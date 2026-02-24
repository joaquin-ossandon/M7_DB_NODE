const { pool } = require("../config/db");

const getAllOwners = async (req, res) => {
  try {
    const { rows: owners } = await pool.query("SELECT * FROM owners");

    res.json({ owners });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOwnerById = async (req, res) => {
  const { owner_id } = req.params;
  try {
    const { rows: owner, rowCount } = await pool.query({
      text: "SELECT * FROM owners WHERE owner_id = $1",
      values: [owner_id],
    });

    if (!rowCount) {
      throw new Error(`No se encontró un owner con el id ${owner_id}`);
    }

    const { rows: pets } = await pool.query({
      text: "SELECT * FROM pets WHERE owner_id = $1",
      values: [owner_id],
    });

    res.json({
      owner: {
        ...owner,
        pets,
      },
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
  getOwnerById,
};
