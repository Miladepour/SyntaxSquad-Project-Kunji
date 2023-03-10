import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Data from "../../components/form-data/formdata";
import "./UserPreferences.css";

export default function UserPreferences() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
	};
	return (
		<Form className="form" onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="form-group2" controlId="service">
				<Form.Label>Please select the service:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					type="text"
					name="service"
					{...register("service", {
						required: "Please select your service",
					})}
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
				<Form.Text className="error-message">
					{errors.service && errors.service.message}
				</Form.Text>
			</Form.Group>
			<Form.Group className="form-group2" controlId="location">
				<Form.Label>Please select preferred location for service:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					type="text"
					name="location"
					{...register("location", {
						required: "Please select your location",
					})}
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
				<Form.Text className="error-message">
					{errors.location && errors.location.message}
				</Form.Text>
			</Form.Group>
			<div className="container-btn">
				<Button type="submit">
					Show Result
				</Button>
			</div>
		</Form>
	);
}
