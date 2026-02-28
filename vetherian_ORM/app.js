require("dotenv").config();
const { server } = require("./server");
const { sequelize } = require("./src/config/database");
const { Owner } = require("./src/models/owner");
const { Pet } = require("./src/models/pet");

const PORT = process.env.PORT || 3030;

server.listen(PORT, async () => {
  await sequelize.sync({ force: true });

  await Owner.create({
    name: "Joselito",
    phone: "+56933344455",
  });

  await Pet.create({
    name: "Joselito",
    species: "Pony",
    age: 5,
  });

  console.log(`Server running on http://localhost:${PORT}`);
});
