import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";

export default function SendEmailButton({ sendEmail }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  function handleClose() {
    setShowModal(false);
    setEmail("");
    setMessageSent(false);
  }

  function handleShow() {
    setShowModal(true);
    setEmail("");
    setMessageSent(false);
  }

  function handleSendEmail() {
    sendEmail(email);
    setMessageSent(true);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Send Email
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Enter your email address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>Email sent successfully.</p>
          ) : (
            <FormControl
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!messageSent && (
            <Button variant="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
