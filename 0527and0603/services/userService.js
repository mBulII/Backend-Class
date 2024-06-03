import db from "../dist/database/models/index.js";

export const createUser = async (req) => {
  console.log(db.User);
  const { name, email, password, password_second, cellphone } = req.body;
  if (password !== password_second) {
    return {
      status: 400,
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
      status: 400,
      message: "User already exists",
    };
  }
  const newUser = await db.User.create({
    name,
    email,
    password,
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
      },
    }),
  };
};
