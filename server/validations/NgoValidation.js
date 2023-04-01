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
  website: yup.string().max(100).label("Website"),
  email: yup.string().email().max(256).label("Email"),
  email_status: yup.string().max(100).label("Email Status"),
  call_response: yup.string().max(100).label("Call Response"),
}).required();



module.exports = ngoSchema;