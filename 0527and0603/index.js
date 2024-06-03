import express from "express";
import bodyParser from "body-parser";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";

const app = express();

app.use(bodyParser.json());
app.use("/users", userController);
app.use("/auth", authController);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
