module.exports = (app) => {
  // home test
  app.get("/", (req, res) => {
    res.send("hello from server!");
  });

  // POST test
  app.post("/userReg", (req, res) => {
    res.send(req.body);
  });
};
