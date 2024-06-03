import { Router } from "express";
import { createUser, getUserById } from "../services/userService.js";
import { isNumber } from "../middlewares/numberMiddleware.js";
import {
  isValidUserById,
  hasPermissions,
} from "../middlewares/userMiddleware.js";

const router = Router();
router.post("/create", async (req, res) => {
  const response = await createUser(req);
  res.code(response.code).message(response.message);
});

router.get(
  "/:id",
  [isNumber, isValidUserById, hasPermissions],
  async (req, res) => {
    const response = await getUserById(req.params.id);
    res.send(response.message);
  }
);

router.put("/:id", isNumber, isValidUserById, hasPermissions, (req, res) => {});

router.delete(
  "/:id",
  isNumber,
  isValidUserById,
  hasPermissions,
  (req, res) => {}
);

export default router;
