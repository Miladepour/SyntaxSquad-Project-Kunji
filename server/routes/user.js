import db from "../db";
const express = require("express");
const validation = require("../middlewares/validationMiddleware");
const userSchema = require("../validations/UserValidation");

const router = express.Router();

  router.post("/", validation(userSchema) ,async (req, res) => {
    const { body } = req;
    try {
      const result = await db.query(
        "INSERT INTO user_informatiom(name, email, gender, date_of_birth, current_location, pin_code, phone_number, qualification, date_of_release,case_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
          body.name,
          body.email,
          body.gender,
          body.date_of_birth,
          body.current_location,
          body.pin_code,
          body.phone_number,
          body.qualification,
          body.date_of_release,
          body.case_status,
        ]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  export default router;