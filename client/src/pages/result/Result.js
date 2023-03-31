import { useEffect, useState } from "react";
import styles from "./Result.module.css";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import SendSmsButton from "./button/SendSMSButton";
import SendEmailButton from "./button/SendEmailButton";
import SendWhatsappButton from "./button/SendWhatsappButton";
import LocationIcon from "../../components/LocationIcon";
import { useLocation } from "react-router-dom";
import MobileVersion from "./ResultMobV.js";

export default function Result(  ) {
    const { state } = useLocation();
	let [searchParams, setSearchParams] = useSearchParams();
	const [service, setService] = useState(searchParams.get("service"));
	const [location, setLocation] = useState(searchParams.get("location"));
	const [data, setData] = useState([]);
	const [emailSent, setEmailSent] = useState(false);
	const [smsSent, setSmsSent] = useState(false);
	const [whatsappSent, setWhatsappSent] = useState(false);

	useEffect(() => {
		fetch(`/api/ngo?service=${encodeURIComponent(service)}&location=${location}`)
			.then((response) => response.json())
			.then((data) => {
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
		console.log(email);
		if (!email) {
			return;
		}
		fetch("/api/sendmail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
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
				"Content-Type": "application/json"
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
	function sendWhatsapp(number) {
		if (!number) {
			return;
		}
		fetch("/api/sendwhatsapp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: number,
				data: data,
				service: service,
				location: location,
			}),
		})
			.then((response) => {
				if (response.ok) {
					setWhatsappSent(true);
				} else {
					throw new Error("Failed to send Whatsapp message");
				}
			})
			.catch((error) => console.error(error));
	}
	function handleServiceChange(selectedService) {
    setService(selectedService);
    setSearchParams({
      service: selectedService,
      location: location,
    });
  }

  function handleLocationChange(selectedLocation) {
    setLocation(selectedLocation);
    setSearchParams({
      service: service,
      location: selectedLocation,
    });
  }
	return (
		<>
		<h3 className="text-center" style={{ color:"#004e87" }}>List of NGOs</h3>
			<div className="d-md-none">
			<div className="d-flex justify-content-center">
					<SendEmailButton emailSent={emailSent} sendEmail={sendEmail}  state={state}  />
					<SendSmsButton smsSent={smsSent} sendSms={sendSms}  state={state} />
          <SendWhatsappButton whatsappSent={whatsappSent} sendWhatsapp={sendWhatsapp}/>
			</div>
				<MobileVersion onServiceChange={handleServiceChange} onLocationChange={handleLocationChange} />
			</div>
			<div className="d-none d-md-block">
		<div className="col-3">
					<SendEmailButton emailSent={emailSent} sendEmail={sendEmail}  state={state}  />
					<SendSmsButton smsSent={smsSent} sendSms={sendSms}  state={state} />
          <SendWhatsappButton whatsappSent={whatsappSent} sendWhatsapp={sendWhatsapp}/>
		</div>
		</div>
		<div className={`d-flex ${styles.page}`}>
			<div className="col-3 bg-light rounded m-2 d-none d-md-block">
				<Form>
					<Form.Group
						className={styles.selectGroup}
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
									checked={service === type && true}
								/>
								<span className="mx-2">{type}</span>
							</div>
						))}
					</Form.Group>
					<Form.Group
						className={styles.selectGroup}
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
									checked={location === type && true}
									onChange={selectLocation}
								/>
							</div>
						))}
					</Form.Group>
				</Form>
			</div>
			<div className={`col-9 d-flex flex-column align-items-center rounded m-2 ${styles.dataTable}`}>
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
							<div className="card-body" style={{ color: "#004e87" }}>
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
											<span key={index}>
												Phone number : {item.phone_number} {item.description}
											</span>
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
		</>
	);
}
