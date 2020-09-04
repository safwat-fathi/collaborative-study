const http = require("http");
const app = require("./app");
// add database connection
require("./db");
// add websocket
require("./ws");

const PORT = 4000;
app.listen(PORT, () => console.log(`API is running on port ${PORT}`));
