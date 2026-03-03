require("dotenv").config();
const { server } = require("./server");
const { sequelize } = require("./src/config/database");
const { Owner } = require("./src/models/owner");
const { Pet } = require("./src/models/pet");

const PORT = process.env.PORT || 3030;

server.listen(PORT, async () => {
  await sequelize.sync({ force: true });

  await Owner.create(
    {
      name: "Joselito",
      phone: "+56933344455",
      pets: [
        {
          name: "Miguelito",
          age: 5,
          species: "Pony",
        },
        {
          name: "Minnie",
          age: 100,
          species: "Ratón",
        },
      ],
    },
    {
      include: [
        {
          association: "pets",
        },
      ],
    },
  );

  await Owner.findByPk(1, {
    include: "pets",
  });

  await Pet.findAll({
    include: "owner",
  });

  console.log(`Server running on http://localhost:${PORT}`);
});
