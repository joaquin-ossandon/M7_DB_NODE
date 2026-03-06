const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { mailer } = require("../config/nodemailer");

const Owner = sequelize.define("owners", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

Owner.addHook("beforeCreate", "validatePets", (owner) => {
  console.log("VALIDANDO PETS")
  if (!owner.pets.length) {
    //0 es un falsy
    throw new Error("Necesitas agregar al menos una mascota");
  }
});

Owner.addHook("beforeCreate", "validatePhoneFormat", (owner) => {
  console.log("VALIDANDO PHONE")

  if (owner.phone.length != 12) {
    throw new Error(
      `Tu número no tiene el formato correcto, no abandone a ${owner.pets[0].name}`,
    );
  }
});

Owner.addHook("afterCreate", "sendEmail", async (owner) => {
  console.log(`Mandando correo a ${owner.name}`)

  try {
    const info = await mailer.sendMail({
      from: 'fullstackjavasciptveterinariob@gmail.com', // sender address
      to: "fullstackjavasciptveterinariob@gmail.com", // list of recipients
      subject: "Bienvenido!", // subject line
      text: `Hola que hace ${owner.name}, bienvenido a nuestra veterinaria`, // plain text body
      html: `<b>Hola que hace ${owner.name}</b>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
})

module.exports = { Owner };
