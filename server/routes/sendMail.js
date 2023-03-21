const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { body } = req;
  const msg = {
    to: body.to,
    from: `Kunji - Unlearn Project <${process.env.SENDGRID_EMAIL}>`,
    subject: "Your NGO list",
    text: "Please find below the requested information",
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
