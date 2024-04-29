const express = require("express");
const app = express();
const { logMiddleware } = require("./middlewares");
const bodyParser = require("body-parser");
const UserController = require("./controllers/userController");
const pokeController = require("./controllers/pokeController");

app.use(bodyParser.json());
app.use(logMiddleware);
app.use("/users", UserController);
app.use("/poke", pokeController);
app.listen(8000);
