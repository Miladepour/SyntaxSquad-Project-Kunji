import * as yup from "yup";
import { isDate, parse } from "date-fns";

const today = new Date();
function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}
const userSchema = yup.object({
    name: yup.string().min(3).max(300).matches(/^[a-zA-Z\s]+$/, "Name must be letters only.").required().label("Name"),
    email: yup.string().max(256).email().label("Email"),
    gender: yup.string().required("Please select a gender.").label("Gender"),
    dateofBirth: yup.date().transform(parseDateString).max(today).label("Date of Birth"),
    currentLocation: yup.string().min(3).max(50).required().label("Current Location"),
    pinCode: yup.number().typeError("Pin code must be a number.").transform((_, val) => val === "" ? null : Number(val) ? Number(val) : val).min(100000).max(999999).nullable(true).label("Pin Code"),
    phoneNumber: yup.string().min(10).max(13).required().label("Phone Number"),
    qualification: yup.string().min(3).max(50).required().label("Qualification"),
    dateOfRelease: yup.date().transform(parseDateString).max(today).label("Date of Release"),
    caseStatus: yup.string().required("Please select a case status.").label("Case Status"),
  }).required();

module.exports = userSchema;