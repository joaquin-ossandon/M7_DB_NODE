const { default: z } = require("zod");

const createOwnerSchema = z.object({
  owner: z.object({
    name: z.string().trim(), // nombre varchar(50)
    phone: z.string().trim().optional(),
  }),
  pets: z.array(
    z.object({
      name: z.string().trim(),
      species: z.string().trim(),
      age: z.number(),
    }),
  ),
});

module.exports = {
  createOwnerSchema,
};
