const { Pool } = require("pg");

const DATABASE_URI = process.env.DATABASE_URI

const pool = new Pool({
  connectionString: DATABASE_URI,
  // user: "postgres",
  // password: "admin123",
  // database: "veterinary",
  // host: "localhost",
  // port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Cliente -> Gestiona de forma manual las conexiones a mi DB client.connect() y client.end()
// Pool -> Gestiona automáticamente las conexiones a mi DB con un máximo (10), un tiempo de espera por conexion viva (antes de cerrarse "idleTimeoutMillis") y un tiempo de espera por petición (connectionTimeoutMillis)

module.exports = { pool };
