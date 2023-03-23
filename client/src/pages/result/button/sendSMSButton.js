import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import * as yup from "yup";

const smsSchema = yup.string().min(5).max(20).required();

export default function SendSmsButton({ sendSms }) {
  const [showModal, setShowModal] = useState(false);
  const [sms, setSms] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isValidSms, setIsValidSms] = useState(true);

  function handleClose() {
    setShowModal(false);
    setSms("");
    setMessageSent(false);
  }

  function handleShow() {
    setShowModal(true);
    setSms("");
    setMessageSent(false);
  }

  async function handleSendSms() {
    try {
      await smsSchema.validate(sms);
      setIsValidSms(true);
      sendSms(sms);
      setMessageSent(true);
    } catch (error) {
      setIsValidSms(false);
    }
  }

  async function handleSmsChange(e) {
    const newSms = e.target.value;
    setSms(newSms);

    try {
      await smsSchema.validate(newSms);
      setIsValidSms(true);
    } catch (error) {
      setIsValidSms(false);
    }
  }

  return (
    <>
      <button className="btn text-white m-2" type="button" style={{backgroundColor: "#004e87"}} onClick={handleShow}>
        Send SMS
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Enter your telephone number..</Modal.Title>
          <Modal.Body></Modal.Body>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>SMS sent successfully.</p>
          ) : (
            <>
              <FormControl
                placeholder="Enter your telephone number"
                value={sms}
                onChange={handleSmsChange}
                isInvalid={!isValidSms}
              />
              {!isValidSms && (
                <div className="invalid-feedback">Please enter a valid telephone number.</div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!messageSent && (
            <Button variant="primary" onClick={handleSendSms} disabled={!isValidSms}>
              Send SMS
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
