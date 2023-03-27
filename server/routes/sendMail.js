const express = require("express");
const router = express.Router();
const requestSource = require("../middlewares/requestSource");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", requestSource, async (req, res) => {
  console.log("Hello World");
  // const { body } = req;
  // const { service, location } = body;  

  // const formatData = (data) => {
  //   let result = "";
  //   if (!data) {
  //     return result;
  //   }
  //   data.forEach((item) => {
  //     result += `Service: ${item.service.join(", ")}\nZone: ${item.zone}\nOrganization: ${item.organization}\nAddress: ${item.address}\nContact: ${item.contact && item.contact.map((contact) => contact.phone_number + " " + contact.description).join(", ")}\nWebsite: ${item.website}\nEmail: ${item.email}\n\n`;
  //   });
  //   return result;
  // };

  // const formattedData = formatData(body.data);

  // const msg = {
  //   to: body.to,
  //   from: `Kunji - Unlearn Project <${process.env.SENDGRID_EMAIL}>`,
  //   subject: `Your NGO list for ${service} in ${location}`,
  //   text: formattedData,
  // };

  // try {
  //   await sgMail.send(msg);
  //   res.status(200).json({ message: "Email sent" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Error sending email" });
  // }
});

module.exports = router;
