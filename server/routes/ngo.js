import db from "../db";
const express = require("express");
const router = express.Router();

async function getNgo() {
  const { rows } = await db.query("SELECT * FROM ngo");
  return rows;
}

router.get("/", async (req, res) => {
  const ngos = await getNgo();
  res.json(ngos);
});

module.exports = router;