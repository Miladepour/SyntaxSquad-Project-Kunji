import db from "../db";
const express = require("express");
const router = express.Router();
const validation = require("../middlewares/validationMiddleware");
const userSchema = require("../validations/UserValidation");

 router.get("/", async (req,res)=>{
  const { rows } = await db.query("SELECT * FROM user_informations");
   res.send(rows);
 });
  router.post("/", validation(userSchema) ,async (req, res) => {
    const { body } = req;
    try {
      const result = await db.query(
        "INSERT INTO user_informations(name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release,case_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *",
        [
          body.name,
          body.email,
          body.gender,
          body.dateOfBirth,
          body.currentLocation,
          body.pinCode,
          body.phoneNumber,
          body.qualification,
          body.dateOfRelease,
          body.caseStatus,
        ]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  export default router;
  module.exports=router;