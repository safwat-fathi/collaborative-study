const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017", {
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
