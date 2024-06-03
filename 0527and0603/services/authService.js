import db from "../dist/database/models/index.js";

export const login = async (email, password) => {
  const response = await db.User.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (!response) {
    return {
      code: 401,
      message: "Unauthorized",
    };
  }

  const token = Buffer.from(
    JSON.stringify({
      name: response.name,
      email: response.email,
      roles: ["user"],
      expiration: new Date().setHours(new Date().getHours() + 1),
    })
  ).toString("base64");

  const session = {
    id_user: response.id,
    token: token,
  };

  await db.session.create(session);

  return {
    code: 200,
    message: token,
  };
};
