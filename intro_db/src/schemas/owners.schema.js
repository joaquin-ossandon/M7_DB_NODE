const { default: z } = require("zod");

const createOwnerSchema = z.object({
  name: z.string(), // nombre varchar(50)
  phone: z.string().optional(),
});

module.exports = {
  createOwnerSchema,
};
