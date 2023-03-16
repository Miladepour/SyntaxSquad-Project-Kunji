import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

  email: yup.string().email().required().label("Email"),

  gender: yup.string().required("Please select a gender.").label("Gender"),

  dateOfBirth: yup.date().transform(parseDateString).max(today).label("Date of Birth"),

  currentLocation: yup.string().min(3).max(50).required().label("Current Location"),

  pinCode: yup.number().typeError("Pin code must be a number.").min(100000).max(999999).required().label("Pin Code"),

  phoneNumber: yup.string().min(5).max(20).required().label("Phone Number"),

  qualification: yup.string().min(3).max(50).required().label("Qualification"),

  dateOfRelease: yup.date().transform(parseDateString).max(today).label("Date of Release"),

  caseStatus: yup.string().required("Please select a case status.").label("Case Status"),
}).required();

export default function UserForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    navigate("/user-preferences");
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
          <Form.Control
            type="text"
            {...register("qualification")}
            isInvalid={errors.qualification?.message}
          />
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
            <option value="complete">Complete</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.caseStatus?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <div className="text-center mb-4">
        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}