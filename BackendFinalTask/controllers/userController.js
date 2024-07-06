import { Router } from "express";
import {
  createUser,
  getUserById,
  getAllActiveUsers,
  getFilteredUsers,
  updateUser,
  deleteUser,
} from "../services/userService.js";
import {
  isValidUserById,
  hasPermissions,
} from "../middlewares/userMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { isNumber } from "../middlewares/numberMiddleware.js";

const router = Router();

router.post("/create", async (req, res) => {
  const response = await createUser(req);
  res.status(response.code).json(response.message);
});

router.get("/getAllUsers", [validateToken], async (req, res) => {
  const response = await getAllActiveUsers();
  res.status(response.code).json(response.message);
});

router.get("/findUsers", [validateToken], async (req, res) => {
  const { status, name, loggedInBefore, loggedInAfter } = req.query;
  const response = await getFilteredUsers({
    status,
    name,
    loggedInBefore,
    loggedInAfter,
  });
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
