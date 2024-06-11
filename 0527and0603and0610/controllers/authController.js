import { Router } from "express";
import { login, logout } from "../services/authService.js";
import { createUser } from "../services/userService.js";
import {
  validateUserAndPass,
  validateToken,
} from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/login", validateUserAndPass, async (req, res) => {
  try {
    const response = await login(req.body.email, req.body.password);
    res.status(response.code).json(response.message);
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const response = await createUser(req);
    res.status(response.code).json(response.message);
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", validateToken, async (req, res) => {
  try {
    const response = await logout(req.headers.token);
    res.status(response.code).json(response.message);
  } catch (error) {
    console.error("Error while logging out user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
