import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./ResultMobV.module.css";
import fieldData from "../../../../data/fieldData";

export default function ResultMobV(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [service, setService] = useState(searchParams.get("service"));
  const [location, setLocation] = useState(searchParams.get("location"));

  function handleServiceChange(e) {
    setService(e.target.value);
    props.onServiceChange(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
    props.onLocationChange(e.target.value);
  }

  return (
    <div className={`d-md-none ${styles.form} mt-4 mb-4`}>
      <select className="form-select mb-4" value={service} onChange={handleServiceChange}>
        {fieldData.services.map((service) => {
          return (
            <option key={service} value={service}>
              {service}
            </option>
          );
        })}
      </select>
      <select className="form-select" value={location} onChange={handleLocationChange}>
        <option value="North">North</option>
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="Central">Central</option>
        <option value="South">South</option>
      </select>
    </div>
  );
}
