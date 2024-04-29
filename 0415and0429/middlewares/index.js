const logMiddleware = (req, res, next) => {
  console.log("Request URL:", req.url, req.method);
  next();
};

const validateEmailMiddleware = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).send("Email is required");
    return;
  }
  if (!req.body.email.endsWith("@dominioempresa.com")) {
    res.status(400).send("Email is not valid");
    return;
  }
  next();
};

module.exports = {
  logMiddleware,
  validateEmailMiddleware,
};
