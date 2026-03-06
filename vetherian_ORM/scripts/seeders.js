require("dotenv").config();
const { Owner, Pet, sequelize } = require("../src/models"); // Ajusta la ruta a tu carpeta de modelos

const NAMES = [
  "Juan",
  "María",
  "Carlos",
  "Ana",
  "Luis",
  "Elena",
  "Pedro",
  "Sofía",
  "Diego",
  "Lucía",
];
const SURNAMES = [
  "García",
  "Martínez",
  "López",
  "González",
  "Rodríguez",
  "Pérez",
  "Sánchez",
  "Ramírez",
];
const PET_NAMES = [
  "Firulais",
  "Luna",
  "Toby",
  "Mora",
  "Coco",
  "Simba",
  "Rocky",
  "Bella",
  "Max",
  "Kira",
];
const SPECIES = ["Perro", "Gato", "Hamster", "Conejo", "Loro"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function seed() {
  try {
    // 1. Conectar y limpiar (opcional)
    await sequelize.authenticate(); // SELECT 1+1
    console.log("Conexión establecida para el seeding...");

    // Limpiamos tablas para evitar duplicados si corres el script varias veces
    await Pet.destroy({ where: {} });
    await Owner.destroy({ where: {} });

    console.log("Generando 500 propietarios y sus mascotas...");

    for (let i = 0; i < 500; i++) {
      // Crear Propietario con Nombre + Apellido aleatorio
      const fullName = `${getRandom(NAMES)} ${getRandom(SURNAMES)}`;
      const phone = `555-${getRandomInt(1000, 9999)}`;

      const owner = await Owner.create({
        name: fullName,
        phone: phone,
      });

      // Determinar cuántas mascotas tendrá este usuario (entre 1 y 4)
      const petCount = getRandomInt(1, 4);
      const petsData = [];

      for (let j = 0; j < petCount; j++) {
        petsData.push({
          name: getRandom(PET_NAMES),
          age: getRandomInt(1, 15),
          species: getRandom(SPECIES),
          ownerId: owner.id, // Sequelize usa por defecto el nombre del modelo + Id
        });
      }

      // Inserción masiva de mascotas para este dueño
      await Pet.bulkCreate(petsData);
    }

    console.log("✅ Proceso terminado: 500 usuarios y sus mascotas creados.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el seeding:", error);
    process.exit(1);
  }
}

seed();
