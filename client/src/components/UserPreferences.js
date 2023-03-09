import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Data from "./form-data/formdata";
import "./UserPreferences.css";

export default function UserPreferences() {
    const [input, setInput] = useState({
        service: "",
        location: "",
      });

      const handleChange = (event, inputName) => {
        setInput({ ...input, [inputName]: event.target.value });
        console.log(`>>>Selected ${inputName}:`, event.target.value);
      };
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const serviceRef = register("service");
	const locationRef = register("location");

	return (
		<Form className="form">
			<Form.Group className="form-group" controlId="service">
				<Form.Label>Please select the service:</Form.Label>
				<Form.Select
					aria-label="Default select example"
					className="w-50"
					type="text"
					name="service"
					placeholder="Select here..."
                    ref={serviceRef}
                    value={input.service}
                    onChange={(event) => handleChange(event, "service")}
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
                    ref={locationRef}
                    value={input.location}
                    onChange={(event) => handleChange(event, "location")}
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
				<Link className="btn btn-primary" to="#">
					Next
				</Link>
			</div>
		</Form>
	);
}
