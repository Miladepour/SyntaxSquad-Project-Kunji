import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./Result.css";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import SendEmailButton from "./button/sendEmailButton";

export default function Result() {
	let [searchParams, setSearchParams] = useSearchParams();
	const [service, setService] = useState(searchParams.get("service"));
	const [location, setLocation] = useState(searchParams.get("location"));
	const [data, setData] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
	useEffect(() => {
		fetch(`/api/ngo?service=${service}&location=${location}`)
			.then((response) => response.json())
			.then((data) => {
        console.log(data);
        setData(data);
}
        );
	}, [service, location]);

	function selectService(e) {
		setService(e.target.value);
		setSearchParams({
			service: e.target.value,
			location: location,
		});
	}

	function selectLocation(e) {
		setLocation(e.target.value);
		setSearchParams({
			service: service,
			location: e.target.value,
		});
	}
	function sendEmail(email) {
		if (!email) {
			return;
		}
		fetch("/api/sendmail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ to: email, data: data, service: service, location: location }),
		})
			.then((response) => {
				if (response.ok) {
					setEmailSent(true);
				} else {
					throw new Error("Failed to send email");
				}
			})
			.catch((error) => console.error(error));
	}
	return (
		<>
			<Form>
				<Form.Group className="select-group" controlId="service">
					<Form.Label>Service</Form.Label>
					<Form.Select
						aria-label="Service"
						value={service}
						onChange={selectService}
					>
						<option>Legal Aid</option>
						<option>Drug De-Addiction</option>
						<option>Education</option>
						<option>Employment & Life Skills</option>
						<option>Education for children</option>
						<option>Health Care</option>
						<option>Mental Health</option>
						<option>Shelter, Food and Clothing Assistance</option>
						<option>Important Documents</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="select-group" controlId="location">
					<Form.Label>Location</Form.Label>
					<Form.Select
						aria-label="Location"
						value={location}
						onChange={selectLocation}
					>
						<option>North</option>
						<option>East</option>
						<option>Central</option>
						<option>West</option>
						<option>South</option>
					</Form.Select>
				</Form.Group>
			</Form>
			<br></br>
			<h3 className="bg-primary header-list">List of NGOs</h3>
			<SendEmailButton emailSent={emailSent} sendEmail={sendEmail} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Service</th>
						<th>Zone</th>
						<th>Organization</th>
						<th>Address</th>
						<th>Contact</th>
						<th>Website</th>
						<th>EmailAddress</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.id}>
							<td>
              <Stack gap={3}>
								{item.service.map((item, index) => (
                   <div className="bg-light border" 	key = { index }>{ item }</div>
								))}
                </Stack>
							</td>
							<td>{item.zone}</td>
							<td>{item.organization}</td>
							<td>{item.address}</td>
							<td>
              <Stack gap={3}>
								{item.contact && item.contact.map((item, index) => (
                  <div className="bg-light border" 	key = { index }>{ item.phone_number } {item.description}</div>
								))}
                </Stack>
							</td>
							<td>{item.website}</td>
							<td>{item.email}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
