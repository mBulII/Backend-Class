const express = require("express");
const app = express();
app.use(express.json());

const { validateNumberParams } = require("./middleware/index");

app.get("/", (req, res) => {
  console.log(req);
  res.send({
    code: 200,
    message: "GET OK",
  });
});

app.get("/products/:id", validateNumberParams, (req, res) => {
  console.log("inside the route");
  const id = req.params.id;
  res.send({
    code: 200,
    message: "FOUND ID",
    body: {
      id: id,
      name: "keyboard",
    },
  });
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send({
    code: 200,
    message: "POST OK",
    body: req.body,
  });
});

app.listen(8000);
