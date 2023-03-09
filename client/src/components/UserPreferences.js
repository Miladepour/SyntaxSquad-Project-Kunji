import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Data from "./form-data/formdata";
import "./UserPreferences.css";

export default function UserPreferences() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Form className="form" onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="form-group" controlId="service">
				<Form.Label>Please select the service:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					type="text"
					name="service"
					placeholder="Select here..."
					{...register("service", {
						required: "please select your service",
					})}
                    onChange={(e) => console.log(e.target.value)}
				>
					<option defaultValue="" hidden>
						Select here...
					</option>
					{Data.services.map((service) => {
						return (
							<option key={service} value={service}>
								{service}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
			<Form.Group className="form-group" controlId="location">
				<Form.Label>Please select preferred location for service:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					type="text"
					name="location"
					placeholder="Select here..."
					{...register("location", {
						required: "please select your location",
					})}
                    onChange={(e) => console.log(e.target.value)}
				>
					<option defaultValue="" hidden>
						Select here...
					</option>
					{Data.location.map((location) => {
						return (
							<option key={location} value={location}>
								{location}
							</option>
						);
					})}
				</Form.Select>
			</Form.Group>
			<div className="container-btn">
				<Link className="btn btn-primary" to="#" onClick={handleSubmit(onSubmit)}>
					Next
				</Link>
			</div>
		</Form>
	);
}
