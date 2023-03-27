import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Data from "../../components/form-data/formdata";
import styles from "./UserPreferences.module.css";

export default function UserPreferences() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
  const onSubmit = (data) => {
    navigate(`/result?service=${data.service}&location=${data.location}`);
  };
	return (
		<Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className={styles.formGroup} controlId="service">
				<Form.Label>Please select the service:</Form.Label>
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
				<Form.Label>Please select preferred location for service:</Form.Label>
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
					Show Result
				</Button>
			</div>
		</Form>
	);
}
