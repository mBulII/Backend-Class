import db from "../dist/database/models/index.js";

export const isValidUserById = async (req, res, next) => {
  const id = req.params.id;
  const response = db.User.findOne({
    where: {
      id: id,
    },
  });
  if (!response) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  next();
};

export const hasPermissions = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      message: "Token is required",
    });
  }
  const session = await db.Session.findOne({
    where: {
      token: token,
    },
  });
  if (!session) {
    return res.status(401).json({
      message: "Wrong Token",
    });
  }
  const payload = JSON.parse(Buffer.from(token, "base64").toString("ascii"));
  if (!payload.roles.includes("admin")) {
    if (payload.id !== req.params.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
  next();
};
