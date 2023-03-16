import db from "../db";
const express = require("express");
const router = express.Router();

async function getNgo() {
  const { rows } = await db.query("SELECT * FROM ngo");
  return rows;
}
router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const result = await db.query(
      "INSERT INTO ngo (service, zone, organization, address, contact, website, email, email_status, call_response) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        body.service,
        body.zone,
        body.organization,
        body.address,
        JSON.stringify(body.contact),
        body.website,
        body.email,
        body.email_status,
        body.call_response,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Failed to insert NGO into database:", err);
    res.status(500).json({ error: "Failed to create NGO" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM ngo WHERE id=$1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "NGO not found" });
    }
    res.json(`${id} has been deleted!`);
  } catch (err) {
    console.error("Failed to delete NGO from database:", err);
    res.status(500).json({ error: "Failed to delete NGO" });
  }
});


router.get("/", async (req, res) => {
  const ngos = await getNgo();
  res.json(ngos);
});

module.exports = router;