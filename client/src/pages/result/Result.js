import { useEffect, useState } from "react";
import "./Result.css";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import SendSmsButton from "./button/SendSMSButton";
import SendEmailButton from "./button/SendEmailButton";
import LocationIcon from "../../components/LocationIcon";

export default function Result() {
	let [searchParams, setSearchParams] = useSearchParams();
	const [service, setService] = useState(searchParams.get("service"));
	const [location, setLocation] = useState(searchParams.get("location"));
	const [data, setData] = useState([]);
	const [emailSent, setEmailSent] = useState(false);
	const [smsSent, setSmsSent] = useState(false);
	useEffect(() => {
		fetch(`/api/ngo?service=${service}&location=${location}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setData(data);
			});
	}, [service, location]);

	function selectService(e) {
		if (e.target.checked) {
			setService(e.target.id);
			setSearchParams({
				service: e.target.id,
				location: location,
			});
		}
	}

	function selectLocation(e) {
		if (e.target.checked) {
			setLocation(e.target.id);
			setSearchParams({
				service: service,
				location: e.target.id,
			});
		}
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
			body: JSON.stringify({
				to: email,
				data: data,
				service: service,
				location: location,
			}),
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
	function sendSms(sms) {
		if (!sms) {
			return;
		}
		fetch("/api/sendsms", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: sms,
				data: data,
				service: service,
				location: location,
			}),
		})
			.then((response) => {
				if (response.ok) {
					setSmsSent(true);
				} else {
					throw new Error("Failed to send SMS");
				}
			})
			.catch((error) => console.error(error));
	}
	return (
		<div className="d-flex">
			<div className="col-3 bg-light rounded m-2">
				<Form>
					<Form.Group
						className="select-group"
						style={{ color: "#004e87" }}
						controlId="service"
					>
						<Form.Label className="fw-bolder">Service :</Form.Label>
						{[
							"Legal Aid",
							"Drug De-Addiction",
							"Education",
							"Employment & Life Skills",
							"Education for children",
							"Health Care",
							"Mental Health",
							"Shelter, Food and Clothing Assistance",
							"Important Documents",
						].map((type) => (
							<div key={`${type}`} className=" d-flex mb-3">
								<Form.Check
									type="radio"
									name="service"
									id={`${type}`}
									onChange={selectService}
								
								/>
								<span className="mx-2">{type}</span>
							</div>
						))}
					</Form.Group>
					<Form.Group
						className="select-group"
						style={{ color: "#004e87" }}
						controlId="location"
					>
						<Form.Label className="fw-bolder">Location :</Form.Label>
						{["North", "East", "West", "Central", "South"].map((type) => (
							<div key={`${type}`} className="mb-3">
								<Form.Check
								
									type="radio"
									name="location"
									id={`${type}`}
									label={`${type}`}
									onChange={selectLocation}
								/>
							</div>
						))}
					</Form.Group>
				</Form>
			</div>

			<div className="col-9 d-flex flex-column align-items-center rounded m-2">
				<h3 className="py-2 header-list" style={{color:"#004e87"}}>List of NGOs</h3>
				<div className="d-flex justify-content-between" style={{width:"20%"}}>
					<SendEmailButton emailSent={emailSent} sendEmail={sendEmail} />
					<SendSmsButton smsSent={smsSent} sendSms={sendSms} />
				</div>

				{data == "" ? (
					<h2 className="m-4" style={{ color: "#004e87" }}>
						No result matched...
					</h2>
				) : (
					data.map((item) => (
						<div
							key={item.id}
							className="card w-75 mt-2 bg-light"
							style={{ border: "none" }}
						>
							<div class="card-body" style={{ color: "#004e87" }}>
								<h5 className="card-title">{item.organization}</h5>
								<p className="card-text">
									<span className="text-warning">
										<LocationIcon />
									</span>
									<span className="m-2">{item.zone}</span>
								</p>
								<p className="card-text">Address : {item.address}</p>
								<p className="card-text">
									{item.contact &&
										item.contact.map((item, index) => (
											<div key={index}>
												Phone number : {item.phone_number} {item.description}
											</div>
										))}
								</p>
								<p className="card-text">
									{item.website && `Website : ${item.website}`}
								</p>
								<p className="card-text">
									{item.email && `Email : ${item.email}`}
								</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
