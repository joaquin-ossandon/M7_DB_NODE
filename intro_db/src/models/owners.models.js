const { pool } = require("../config/db");

const getAllOwners = async () => {
  try {
    const { rows: owners } = await pool.query("SELECT * FROM owners");

    return owners;
  } catch (error) {
    throw error;
  }
};
const getOwnerById = async (owner_id) => {
  try {
    const { rows: owner, rowCount } = await pool.query({
      text: "SELECT * FROM owners WHERE owner_id = $1",
      values: [owner_id],
    });

    if (!rowCount) {
      // falsy -> 0 "" false null undefined
      throw new Error(`No se encontró un owner con el id ${owner_id}`);
    }

    const { rows: pets } = await pool.query({
      text: "SELECT * FROM pets WHERE owner_id = $1",
      values: [owner_id],
    });

    return {
      owner: {
        ...owner,
        pets,
      },
    };
  } catch (error) {
    throw error;
  }
};
const createOwner = async (owner, pets) => {
  // cliente dedicado sólo para cuando sean consultas "complejas" (ej: transacciones o multiples queries)
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const query =
      "INSERT INTO owners (name, phone) VALUES ($1, $2) RETURNING *";
    const values = [owner.name, owner.phone];

    const ownerResult = await client.query({
      text: query,
      values,
    });

    let petAcc = pets.map(async (pet) => {
      const query =
        "INSERT INTO pets (name, species, age, owner_id) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [
        pet.name,
        pet.species,
        pet.age,
        ownerResult.rows[0].owner_id,
      ];

      const petResult = await client.query({
        text: query,
        values,
      });

      return petResult.rows[0]
    }); // [pet1, pet2, petN]

    const petResults = await Promise.all(petAcc)  // [...petAcc, ...petAcc2] => [1,2,3] [4,5,6] -> [1,2,3,4,5,6]

    client.query("COMMIT");

    return { ...ownerResult.rows[0], pets: petResults };
    // ownerResult.rows[0] => { name: "...", phone: "..." }
    // { name: "Anibal", "phone": "+569444555666", pets: [] }
    // ORM syntax -> pets.getById(3) -> pets.createOne({name, age, species})
  } catch (error) {
    client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const updateOwner = async (owner_id, name, phone) => {
  try {
    const result = await pool.query({
      text: "UPDATE owners SET name=$1, phone=$2 WHERE owner_id=$3 RETURNING *",
      values: [name, phone, owner_id],
    });

    if (!result.rowCount) {
      throw new Error(`No se encontró el usuario con el ID ${owner_id}`);
    }

    return result.rows[0]; // {name, phone, owner_id}
  } catch (error) {
    throw error;
  }
};

const deleteOwner = async (owner_id) => {
  try {
    const result = await pool.query({
      text: "DELETE from owners WHERE owner_id=$1 RETURNING *",
      values: [owner_id],
    });

    if (!result.rowCount) {
      throw new Error(`No se encontró el usuario con el ID ${owner_id}`);
    }

    return result.rows[0]; // {name, phone, owner_id}
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getOwnerById,
  getAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
};
