import { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

import "./UserForm.css";

export default function UserForm() {
  const [input, setInput] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    currentLocation: "",
    pinCode: "",
    phoneNumber: "",
    qualification: "",
    dateOfRelease: "",
    caseStatus: ""
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <Form className="form">
      <Form.Group className="form-group" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="gender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="gender"
          value={input.gender}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="dateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="dateOfBirth"
          value={input.dateOfBirth}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="currentLocation">
        <Form.Label>Current Location</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="currentLocation"
          value={input.currentLocation}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="pinCode">
        <Form.Label>Pin Code</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="pinCode"
          value={input.pinCode}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="qualification">
        <Form.Label>Educational Qualification</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="qualification"
          value={input.qualification}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="dateOfRelease">
        <Form.Label>Date of release</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="dateOfRelease"
          value={input.dateOfRelease}
          onChange={handleChange} />
      </Form.Group>

      <Form.Group className="form-group" controlId="caseStatus">
        <Form.Label>Case Status</Form.Label>
        <Form.Control
          className="w-50"
          type="text"
          name="caseStatus"
          value={input.caseStatus}
          onChange={handleChange} />
      </Form.Group>

      <div className="container-btn">
        <Link className="btn btn-primary" to="/">Next</Link>
      </div>
    </Form>
  );
}