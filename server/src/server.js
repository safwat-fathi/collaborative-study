const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
// add websocket
require("./ws");
const PORT = 4000;
/* 
----------------
MongoDB >>>>>>>
----------------
*/
mongoose
  .connect("mongodb://localhost/27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongoose connected!");
  })
  .catch((err) => {
    console.error(err);
  });

const db = mongoose.connection;

db.once("open", (err) => {
  if (err) console.error(err);
  console.log("connected to db!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* 
Cases should be handled:
-----------------------
- utilty functions (broadcast) in utils folder.
*/
