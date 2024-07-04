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
  const response = await createUser(req);
  res.status(response.code).json(response.message);
});

router.get(
  "/:id",
  [isNumber, isValidUserById, validateToken, hasPermissions],
  async (req, res) => {
    const response = await getUserById(req.params.id);
    res.status(response.code).json(response.message);
  }
);

router.put(
  "/:id",
  [isNumber, isValidUserById, validateToken, hasPermissions],
  async (req, res) => {
    const response = await updateUser(req);
    res.status(response.code).json(response.message);
  }
);

router.delete(
  "/:id",
  [isNumber, isValidUserById, validateToken, hasPermissions],
  async (req, res) => {
    const response = await deleteUser(req.params.id);
    res.status(response.code).json(response.message);
  }
);

export default router;
