const express = require("express");
const router = express.Router();
const requestSource = require("../middlewares/requestSource");
const twilio = require("twilio");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require("twilio")(accountSid, authToken);
router.post("/", requestSource, async (req, res) => {
  const { body } = req;
 

  const formatData = (data) => {
    let result = "";
    if (!data) {
      return result;
    }
    data.forEach((item) => {
      result += `Service: ${item.service.join(", ")}\nZone: ${item.zone}\nOrganization: ${item.organization}\nAddress: ${item.address}\nContact: ${item.contact && item.contact.map((contact) => contact.phone_number + " " + contact.description).join(", ")}\nWebsite: ${item.website}\nEmail: ${item.email}\n\n`;
    });
    return result;
  };

  const formattedData = formatData(body.data);

  try {
    const message = await client.messages.create({
      body: formattedData,
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
