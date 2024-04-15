const express = require("express");
const userService = require("../services/userService");
const { validateEmailMiddleware } = require("../middlewares/index");

const router = express.Router();
router.get("/all", async (req, res) => {
  const response = await userService.getAll();
  res.json({
    code: 200,
    message: response,
  });
});

router.post("/", validateEmailMiddleware, async (req, res) => {
  const response = await userService.getByEmail(req.body.email);
  res.json({
    code: 200,
    message: response,
  });
});

module.exports = router;
