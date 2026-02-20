const envs = {
  db: {
    DATABASE_URI: process.env.DATABASE_URI,
  },
  PORT: process.env.PORT || 3010,
};

module.exports = envs