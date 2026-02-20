const express = require("express");
const { pool } = require("./src/config/db");
const errorCodesDataBase = require("./src/utils/errorCodes");
const app = express();

app.get("/pets", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FRO pets");

    res.json({ mascotas: rows });
  } catch (error) {
    console.log(error);
    res.json({
      error: errorCodesDataBase(error.code),
    });
  } finally {
    console.log("SIEMPRE ME VOY A EJECUTAR")
  }
});

app.get("/pets/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query({
    text: "SELECT * FROM pets WHERE pet_id = $1",
    values: [id],
  });

  res.json(rows);
});

module.exports = { app };
