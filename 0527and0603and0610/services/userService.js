import db from "../dist/database/models/index.js";
import bcrypt from "bcrypt";

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
    status: 200,
    message: "User created successfully with ID: " + newUser.id,
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
