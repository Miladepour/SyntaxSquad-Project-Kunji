import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./UserForm.module.css";
const today = new Date();

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const schema = yup.object({
  name: yup.string().min(3).max(50).matches(/^[a-zA-Z\s]+$/, "Name must be letters only.").required().label("Name"),
  email: yup.string().email().label("Email"),

  gender: yup.string().required("Please select a gender.").label("Gender"),

  dateOfBirth: yup.date().transform(parseDateString).max(today).label("Date of Birth"),

  currentLocation: yup.string().min(3).max(50).required().label("Current Location"),

  pinCode: yup.number().typeError("Pin code must be a number.").transform((_, val) => val === "" ? null : Number(val) ? Number(val) : val).min(100000).max(999999).nullable(true).label("Pin Code"),

  phoneNumber: yup.string().min(5).max(20).required().label("Phone Number"),

  qualification: yup.string().required().label("Qualification"),

  dateOfRelease: yup.date().transform(parseDateString).max(today).label("Date of Release"),

  caseStatus: yup.string().required("Please select a case status.").label("Case Status"),
}).required();

export default function UserForm() {
  const navigate = useNavigate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    if (isCaptchaVerified) {
      formData.dateOfBirth=new Date(formData.dateOfBirth).toISOString().split("T")[0];
      formData.dateOfRelease=new Date(formData.dateOfRelease).toISOString().split("T")[0];
      try {
        const response = await fetch("/api/user", {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          navigate("/user-preferences");
        } else {
          const data=await response.json();
          console.log(data);
        }
      } catch (error) {
       console.log(error.message);
      }
    } else {
      alert("Please complete the reCAPTCHA challenge.");
    }
  };
  const handleCaptchaChange = (value) => {
    if (value) {
      setIsCaptchaVerified(true);
    }
  };

  const handleCaptchaExpired = () => {
    setIsCaptchaVerified(false);
  };

  const handleCaptchaError = () => {
    alert("There was an error with the reCAPTCHA challenge. Please try again.");
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className={styles.formGroup} controlId="name">
        <Form.Label>Name</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            {...register("name")}
            isInvalid={errors.name?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="email">
        <Form.Label>Email</Form.Label>
        <div className="w-50">
          <Form.Control
            type="email"
            {...register("email")}
            isInvalid={errors.email?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="gender">
        <Form.Label>Gender</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="gender"
            {...register("gender")}
            isInvalid={errors?.gender}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Other'">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="dateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <div className="w-50">
          <Form.Control
            type="date"
            {...register("dateOfBirth")}
            isInvalid={errors?.dateOfBirth}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dateOfBirth?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="currentLocation">
        <Form.Label>Current Location</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            {...register("currentLocation")}
            isInvalid={errors.currentLocation?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.currentLocation?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="pinCode">
        <Form.Label>Pin Code</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            {...register("pinCode")}
            isInvalid={errors.pinCode?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.pinCode?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            {...register("phoneNumber")}
            isInvalid={errors.phoneNumber?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="qualification">
        <Form.Label>Qualification</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="qualification"
            {...register("qualification")}
            isInvalid={errors?.qualification}
          >
            <option value="">Select...</option>
            <option value="Cannot read or write">Cannot read or write</option>
            <option value="8th">8th</option>
            <option value="10th'">10th</option>
            <option value="12th'">12th</option>
            <option value="Graduate'">Graduate</option>
            <option value="Postgraduate'">Postgraduate</option>
            <option value="Other'">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.qualification?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="dateOfRelease">
        <Form.Label>Date of Release</Form.Label>
        <div className="w-50">
          <Form.Control
            type="date"
            {...register("dateOfRelease")}
            isInvalid={errors?.dateOfRelease}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dateOfRelease?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="caseStatus">
        <Form.Label>Case Status</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="caseStatus"
            {...register("caseStatus")}
            isInvalid={errors?.caseStatus}
          >
            <option value="">Select...</option>
            <option value="ongoing">Ongoing</option>
            <option value="Acquitted">Acquitted</option>
            <option value="Convicted">Convicted</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.caseStatus?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>
      <div className="w-50">
      <ReCAPTCHA
       sitekey="6LfUTRElAAAAAGygougsf9-TgpDcXrONCKzZGqJP"
      onChange={handleCaptchaChange}
      onExpired={handleCaptchaExpired}
      onError={handleCaptchaError}
        />
      </div>
      <div className="text-center mb-4">
        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}