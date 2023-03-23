import db from "../db";
const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validationMiddleware");
const ngoSchema = require("../validations/NgoValidation");
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://starter-kit-j5ar.onrender.com/api/",
  issuerBaseURL: 'https://dev-smy0lct7oni31spt.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

async function getNgo() {
  const { rows } = await db.query("SELECT * FROM ngo");
  return rows;
}
router.post("/", jwtCheck, validation(ngoSchema) ,async (req, res) => {
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
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create NGO" });
  }
});

router.put("/:id", jwtCheck, validation(ngoSchema) , async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const result = await db.query(
      "UPDATE ngo SET service=$1, zone=$2, organization=$3, address=$4, contact=$5, website=$6, email=$7, email_status=$8, call_response=$9 WHERE id=$10 RETURNING *",
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
        id,
      ]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "NGO not found" });
    }
    res.json(`${id} has been updated!`);
  } catch (err) {
    res.status(500).json({ error: "Failed to update NGO" });
  }
});


router.delete("/:id", jwtCheck, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM ngo WHERE id=$1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "NGO not found" });
    }
    res.json(`${id} has been deleted!`);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete NGO" });
  }
});


router.get("/", async (req, res) => {
  const ngos = await getNgo();
  res.json(ngos);
});

module.exports = router;