import { Router } from "express";
import { login } from "../services/authService.js";
import { validateUserAndPass } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/login", validateUserAndPass, async (req, res) => {
  const response = await login(req.body.email, req.body.password);
  res.status(response.code).json(response.message);
});

router.post("/register", (req, res) => {});

router.post("/logout", (req, res) => {});

export default router;
