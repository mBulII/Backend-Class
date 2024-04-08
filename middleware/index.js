const validateNumberParams = (req, res, next) => {
  console.log("inside validateNumberParams");
  const id = req.params.id;
  if (!id) {
    res.send({
      code: 401,
      message: "MUST ADD AN ID",
    });
    return;
  }
  if (!Number.isInteger(+id)) {
    res.send({
      code: 401,
      message: "ID MUST BE AN INTEGER",
    });
    return;
  }
  console.log("middleware finished");
  next();
};
module.exports = {
  validateNumberParams,
};
