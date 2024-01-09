import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import styles from "./UserForm.module.css";
import Alert from "react-bootstrap/Alert";

const today = new Date();

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const schema = yup.object({
  name: yup.string().min(3).max(300).matches(/^[a-zA-Z\s]+$/, "Name must be letters only.").required().label("Name"),
  email: yup.string().max(256).email().label("Email"),

  gender: yup.string().required("Please select a gender.").label("Gender"),

  dateOfBirth: yup.date().transform(parseDateString).max(today).label("Date of Birth"),

  currentLocation: yup.string().min(3).max(50).required().label("Current Location"),

  pinCode: yup.number().typeError("Pin code must be a number.").transform((_, val) => val === "" ? null : Number(val) ? Number(val) : val).min(100000).max(999999).nullable(true).label("Pin Code"),

  phoneNumber: yup.string().min(10).max(13).required().label("Phone Number"),

  qualification: yup.string().min(3).max(50).required().label("Qualification"),

  dateOfRelease: yup.date().transform(parseDateString).max(today).label("Date of Release"),

  caseStatus: yup.string().required("Please select a case status.").label("Case Status"),
}).required();

export default function UserForm() {
  const { t } = useTranslation();
  const [recaptchaError, setRecaptchaError] = useState("");
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
          navigate("/user-preferences", { state : formData });
        } else {
          const data=await response.json();
          console.log(data);
        }
      } catch (error) {
       console.log(error.message);
      }
    } else {
      setRecaptchaError(t("errors.reCaptcha.1"));
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
    setRecaptchaError(t("errors.reCaptcha.2"));
  };

  return (
    <>
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className={styles.formGroup} controlId="name">
        <Form.Label>{t("userForm.name")}</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            placeholder="E.g. Shah Rukh Khan"
            {...register("name")}
            isInvalid={errors.name?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="email">
        <Form.Label>{t("userForm.email")}</Form.Label>
        <div className="w-50">
          <Form.Control
            type="email"
            placeholder="Email@domain.com"
            {...register("email")}
            isInvalid={errors.email?.message}

          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="gender">
        <Form.Label>{t("userForm.gender")}</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="gender"
            {...register("gender")}
            isInvalid={errors?.gender}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Other">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="dateOfBirth">
        <Form.Label>{t("userForm.dateOfBirth")}</Form.Label>
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
        <Form.Label>{t("userForm.currentLocation")}</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            placeholder="E.g. Delhi"
            {...register("currentLocation")}
            isInvalid={errors.currentLocation?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.currentLocation?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="pinCode">
        <Form.Label>{t("userForm.pinCode")}</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            placeholder="Enter your six digit pin code"
            {...register("pinCode")}
            isInvalid={errors.pinCode?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.pinCode?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="phoneNumber">
        <Form.Label>{t("userForm.phoneNumber")}</Form.Label>
        <div className="w-50">
          <Form.Control
            type="text"
            placeholder="+91xxxxnnnnnn"
            {...register("phoneNumber")}
            isInvalid={errors.phoneNumber?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="qualification">
        <Form.Label>{t("userForm.qualification")}</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="qualification"
            {...register("qualification")}
            isInvalid={errors?.qualification}
          >
            <option value="">Select...</option>
            <option value="Cannot read or write">Cannot read or write</option>
            <option value="8th">8th</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Other">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.qualification?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className={styles.formGroup} controlId="dateOfRelease">
        <Form.Label>{t("userForm.dateOfRelease")}</Form.Label>
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
        <Form.Label>{t("userForm.caseStatus")}</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="caseStatus"
            {...register("caseStatus")}
            isInvalid={errors?.caseStatus}
          >
            <option value="">Select...</option>
            <option value="Ongoing">Ongoing</option>
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
       sitekey="6Lc5KkspAAAAABnsihB1hQxNKQtYAXWcfsso4nuG"
      onChange={handleCaptchaChange}
      onExpired={handleCaptchaExpired}
      onError={handleCaptchaError}
        />{isCaptchaVerified ? "" : recaptchaError && (
          <Alert variant="danger" onClose={() => setRecaptchaError("")} dismissible>
            {recaptchaError}
          </Alert>
        )}
      </div>
      <div className="text-center mb-4 mt-3">
        <Button variant="primary" type="submit">
          {t("userForm.submitBtn")}
        </Button>
      </div>
    </Form>
    </>
  );
}