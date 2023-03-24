const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require("twilio")(accountSid, authToken);
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const message = await client.messages.create({
      body: "Hello from Kunji App",
      to: body.to, // Text this number
      from: process.env.TRUSTED_NUMBER, // From a valid Twilio number
    });
    console.log(message.sid);
    res.status(200).json({ message: "SMS sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending SMS" });
  }
});

module.exports = router;
