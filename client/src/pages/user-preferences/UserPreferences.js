import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Data from "../../components/form-data/formdata";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./UserPreferences.module.css";

export default function UserPreferences() {
    const { t } = useTranslation();
	const navigate = useNavigate();
	const { state } = useLocation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
  const onSubmit = (data) => {
    navigate(`/result?service=${data.service}&location=${data.location}` , { state :state } );
  };
	return (
		<Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className={styles.formGroup} controlId="service">
				<Form.Label>{t("userPreferences.dropdown1")}:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					{...register("service", {
						required: "Please select your service",
					})}
					isInvalid={errors?.service}
				>
					<option value="">Select here...</option>
					{Data.services.map((service) => {
						return (
							<option key={service} value={service}>
								{service}
							</option>
						);
					})}
				</Form.Select>
				<Form.Control.Feedback type="invalid">
            {errors.service?.message}
          </Form.Control.Feedback>
			</Form.Group>
			<Form.Group className={styles.formGroup} controlId="location">
				<Form.Label>{t("userPreferences.dropdown2")}:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					{...register("location", {
						required: "Please select your location",
					})}
					isInvalid={errors?.location}
				>
					<option value="">Select here...</option>
					{Data.location.map((location) => {
						return (
							<option key={location} value={location}>
								{location}
							</option>
						);
					})}
				</Form.Select>
				<Form.Control.Feedback type="invalid">
            {errors.location?.message}
          </Form.Control.Feedback>
			</Form.Group>
			<div className={styles.containerBtn}>
				<Button type="submit">
					{t("userPreferences.submitBtn")}
				</Button>
			</div>
		</Form>
	);
}
