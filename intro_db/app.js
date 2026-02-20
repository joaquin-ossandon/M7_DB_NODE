require("dotenv").config()
const { app } = require("./server");
const envs = require("./src/config/envs");

const PORT = envs.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
