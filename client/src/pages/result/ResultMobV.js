import React, { useState } from "react";
import styles from "./ResultMobV.module.css";

export default function ResultMobV(props) {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  function handleServiceChange(e) {
    setService(e.target.value);
    props.onServiceChange(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
    props.onLocationChange(e.target.value);
  }

  return (
    <div className={`d-md-none ${styles.form}`}>
      <select className={`form-select mb-2 ${styles.formGroup}`} value={service} onChange={handleServiceChange}>
        <option value="">Select Service</option>
        <option value="Legal Aid">Legal Aid</option>
        <option value="Drug De-Addiction">Drug De-Addiction</option>
        <option value="Education">Education</option>
        <option value="Employment & Life Skills">Employment & Life Skills</option>
        <option value="Education for children">Education for children</option>
        <option value="Health Care">Health Care</option>
        <option value="Mental Health">Mental Health</option>
        <option value="Shelter, Food and Clothing Assistance">Shelter, Food and Clothing Assistance</option>
        <option value="Important Documents">Important Documents</option>
      </select>
      <select className="form-select" value={location} onChange={handleLocationChange}>
        <option value="">Select Location</option>
        <option value="North">North</option>
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="Central">Central</option>
        <option value="South">South</option>
      </select>
    </div>
  );
}
