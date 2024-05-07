const express = require("express");
const { DB } = require("../db/db");
const router = express.Router();

router.get("/all", (req, res) => {
  const db = DB.getInstance();
  return [];
});

module.exports = router;
