const { sequelize } = require("../config/database");
const { Owner } = require("./owner");
const { Pet } = require("./pet");

Owner.hasMany(Pet, { as: "pets" });
Pet.belongsTo(Owner, { as: "owner" });

sequelize.sync({ alter: true });
console.log("Hola")

module.exports = {
  sequelize,
  Owner,
  Pet,
};
