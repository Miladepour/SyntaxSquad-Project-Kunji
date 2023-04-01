import * as yup from "yup";

const ngoSchema = yup.object({
  service: yup.array().min(1, "Please add at least one service.").label("Service"),
  zone: yup.string().required("Please select zone.").label("Zone"),
  organization: yup.string().min(3).max(100).required().label("Organization"),
  address: yup.string().min(3).max(300).required().label("Address"),
  contact: yup.array().min(1, "Please add at least one contact.").of(
    yup.object().shape({
      phone_number: yup.string().min(3).max(50).required().label("Phone Number")
    })
  ),
  website: yup.string().min(3).max(50).required().label("Website"),
  email: yup.string().email().min(3).max(256).required().label("Email"),
  email_status: yup.string().min(3).max(50).required().label("Email Status"),
  call_response: yup.string().min(3).max(50).required().label("Call Response"),
}).required();



module.exports = ngoSchema;