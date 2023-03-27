import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import * as yup from "yup";

const emailSchema = yup.string().email().required();

export default function SendEmailButton({ sendEmail }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSending, setIsSending] = useState(false);

  function handleClose() {
    setShowModal(false);
    setEmail("");
    setMessageSent(false);
    setIsSending(false);
  }

  function handleShow() {
    setShowModal(true);
    setEmail("");
    setMessageSent(false);
    setIsSending(false);
  }

  async function handleSendEmail() {
    try {
      setIsSending(true);
      await emailSchema.validate(email);
      setIsValidEmail(true);
      await sendEmail(email);
      setMessageSent(true);
    } catch (error) {
      setIsValidEmail(false);
    } finally {
      setIsSending(false);
    }
  }

  async function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);

    try {
      await emailSchema.validate(newEmail);
      setIsValidEmail(true);
    } catch (error) {
      setIsValidEmail(false);
    }
  }

  return (
    <>
      <button className="btn text-white m-2" type="button" style={{ backgroundColor: "#004e87" }} onClick={handleShow}>
      {isSending ? "Sending..." : "Send Email"}
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Enter your email address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>Email sent successfully.</p>
          ) : (
            <>
              <FormControl
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!isValidEmail}
              />
              {!isValidEmail && (
                <div className="invalid-feedback">Please enter a valid email address.</div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSending}>
            Close
          </Button>
          {!messageSent && (
            <Button variant="primary" onClick={handleSendEmail} disabled={!isValidEmail || isSending}>
              {isSending ? "Sending..." : "Send Email"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}