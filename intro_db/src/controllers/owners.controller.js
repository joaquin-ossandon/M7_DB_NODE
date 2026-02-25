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

const createOwner = async (req, res) => {
  const user = req.body; // app -> express.urlencode() -> para que entienda lo que viene en los forms y tengamos acceso al req.body.
  // app -> express.json() -> para que entienda cuando se entrega información de texto plano en formato json a nuestro servidor... habilita también acceso a req.body

  // JSON.stringify({hola: "valor"}) -> "{"hola": "valor"}"

  const client = await pool.connect();

  // const trimmedName = name.trim()
  // const trimmedPhone = phone.trim()

  user.name = user.name?.trim()
  user.phone = user.phone?.trim()

  const {name, phone} = user
  
  if(!name) throw new Error("El nombre es obligatorio");
  
  try {
    const query =
      "INSERT INTO owners (name, phone) VALUES ($1, $2) RETURNING *";
    const values = [name, phone];

    const result = await client.query({
      text: query,
      values,
    });

    res.status(201).json({
      success: true,
      owner: result.rows[0],
    }); // estado 201 significa -> Created
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getAllOwners,
  getOwnerById,
  createOwner,
};
