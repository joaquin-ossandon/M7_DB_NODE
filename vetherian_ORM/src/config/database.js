const { Sequelize } = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  ssl: true,
  logging: false,
});

module.exports = { sequelize };
// postgres://postgres.cgjazmirtojrrroeicav:nkpr3b6ymT3vUXFk@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
// postgres://postgres.cgjazmirtojrrroeicav:nkpr3b6ymT3vUXFk@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
