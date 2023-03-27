import React from "react";

function ConfirmationScreen({ formData }) {
  return (
    <div className="w-75 mx-auto mt-3" >
    <p>Thank you for submitting your information.</p>
    <p>Here is the information you entered:</p>
    <ul>
      <li>phone Number: {formData.phoneNumber}</li>
      <li>Email: {formData.email}</li>
    </ul>
  </div>
  );
}

export default ConfirmationScreen;