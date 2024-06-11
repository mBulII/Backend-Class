import express from "express";
import bodyParser from "body-parser";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userController);
app.use("/api/auth", authController);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
