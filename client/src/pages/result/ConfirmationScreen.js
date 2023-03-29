import React from "react";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function ConfirmationScreen({ email , showConfirmationModal ,setEmail , setShowConfirmationModal,phoneNumber,setPhoneNumber }) {
  function handleClose() {
    setShowConfirmationModal(false);
    setEmail("");
    setPhoneNumber("");
  }
  return (
    <Modal show={showConfirmationModal} onHide={handleClose}>
  <Modal.Header>
    <Modal.Title>Confirmation</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {email && (
          <p>
            Thank you! The NGOs list was sent to {email}.
          </p>
        )}
        {phoneNumber && (
          <p>
            Thank you! The NGOS list was sent to {phoneNumber}.
          </p>
        )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
  );
}

export default ConfirmationScreen;