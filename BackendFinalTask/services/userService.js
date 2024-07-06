import db from "../dist/db/models/index.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const createUser = async (req) => {
  const { name, email, password, password_second, cellphone } = req.body;
  if (password !== password_second) {
    return {
      code: 400,
      message: "Passwords do not match",
    };
  }
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return {
      code: 400,
      message: "User already exists",
    };
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.User.create({
    name,
    email,
    password: encryptedPassword,
    cellphone,
    status: true,
  });
  return {
    code: 200,
    message: "User created successfully with ID: " + newUser.id,
  };
};

export const getFilteredUsers = async (filters) => {
  const { status, name, loggedInBefore, loggedInAfter } = filters;
  const whereClause = {};

  if (status) {
    if (status !== "true" && status !== "false") {
      return {
        code: 400,
        message: "Invalid status value. Only 'true' or 'false' are allowed.",
      };
    }
    whereClause.status = status === "true";
  }

  if (name) {
    whereClause.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (loggedInBefore) {
    const beforeDate = new Date(loggedInBefore);
    if (isNaN(beforeDate.getTime())) {
      return {
        code: 400,
        message: "Invalid date format for 'loggedInBefore'",
      };
    }
    whereClause.updatedAt = {
      ...whereClause.updatedAt,
      [Op.lte]: beforeDate,
    };
  }

  if (loggedInAfter) {
    const afterDate = new Date(loggedInAfter);
    if (isNaN(afterDate.getTime())) {
      return {
        code: 400,
        message: "Invalid date format for 'loggedInAfter'",
      };
    }
    whereClause.updatedAt = {
      ...whereClause.updatedAt,
      [Op.gte]: afterDate,
    };
  }

  const users = await db.User.findAll({
    where: whereClause,
    attributes: ["id", "name", "email", "cellphone"],
  });

  return {
    code: 200,
    message: users,
  };
};

export const getAllActiveUsers = async () => {
  return {
    code: 200,
    message: await db.User.findAll({
      where: { status: true },
      attributes: ["id", "name", "email", "cellphone"],
    }),
  };
};

export const getUserById = async (id) => {
  return {
    code: 200,
    message: await db.User.findOne({
      where: {
        id: id,
        status: true,
      },
    }),
  };
};

export const updateUser = async (req) => {
  const user = db.User.findOne({
    where: {
      id: req.params.id,
      status: true,
    },
  });
  const payload = {};
  payload.name = req.body.name ?? user.name;
  payload.password = req.body.password
    ? await bcrypt.hash(req.body.password, 10)
    : user.password;
  payload.cellphone = req.body.cellphone ?? user.cellphone;
  await db.User.update(payload, {
    where: {
      id: req.params.id,
    },
  });
  return {
    code: 200,
    message: "User updated successfully",
  };
};

export const deleteUser = async (id) => {
  const user = db.User.findOne({
    where: {
      id: id,
      status: true,
    },
  });
  await db.User.update(
    {
      status: false,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return {
    code: 200,
    message: "User deleted successfully",
  };
};
