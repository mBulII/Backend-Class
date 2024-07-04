import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    preflightContinue: true,
  })
);
app.use(bodyParser.json());
app.use("/api/v1/users", userController);
app.use("/api/v1/auth", authController);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
