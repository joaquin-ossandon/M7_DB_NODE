require("dotenv").config();
const { server } = require("./server");

const PORT = process.env.PORT || 3030;

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
