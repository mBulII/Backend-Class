import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userService.js";
import { isNumber } from "../middlewares/numberMiddleware.js";
import {
  isValidUserById,
  hasPermissions,
} from "../middlewares/userMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/create", async (req, res) => {
  try {
    const response = await createUser(req);
    res.status(response.code).json(response.message);
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/:id",
  [isNumber, isValidUserById, hasPermissions, validateToken],
  async (req, res) => {
    try {
      const response = await getUserById(req.params.id);
      res.status(response.code).json(response.message);
    } catch (error) {
      console.error("Error while getting user by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/:id",
  [isNumber, isValidUserById, hasPermissions, validateToken],
  async (req, res) => {
    try {
      const response = await updateUser(req);
      res.status(response.code).json(response.message);
    } catch (error) {
      console.error("Error while updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/:id",
  [isNumber, isValidUserById, hasPermissions, validateToken],
  async (req, res) => {
    try {
      const response = await deleteUser(req.params.id);
      res.status(response.code).json(response.message);
    } catch (error) {
      console.error("Error while deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
