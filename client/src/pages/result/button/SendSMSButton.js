import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import * as yup from "yup";

const smsSchema = yup.string().min(13).max(13).required();

export default function SendSmsButton({ sendSms }) {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isValidSms, setIsValidSms] = useState(true);
  const [isSending, setIsSending] = useState(false);

  function handleClose() {
    setShowModal(false);
    setPhoneNumber("");
    setMessageSent(false);
    setIsSending(false);
  }

  function handleShow() {
    setShowModal(true);
    setPhoneNumber("");
    setMessageSent(false);
    setIsSending(false);
  }

  async function handleSendSms() {
    try {
      setIsSending(true);
      await smsSchema.validate(phoneNumber);
      setIsValidSms(true);
      sendSms(phoneNumber);
      setMessageSent(true);
    } catch (error) {
      setIsValidSms(false);
    } finally {
      setIsSending(false);
    }
  }

  async function handleSmsChange(e) {
    const newSms = e.target.value;
    setPhoneNumber(newSms);

    try {
      await smsSchema.validate(newSms);
      setIsValidSms(true);
    } catch (error) {
      setIsValidSms(false);
    }
  }

  return (
    <>
      <button className="btn text-white m-2" type="button" style={{ backgroundColor: "#004e87" }} onClick={handleShow}>
        {isSending ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Sending...
          </>
        ) : (
          "Send SMS"
        )}
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
                placeholder="Enter phone number ( Ex. +9199999999999 )"
                value={phoneNumber}
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
          <Button variant="secondary" onClick={handleClose} disabled={isSending}>
            Close
          </Button>
          {!messageSent && (
            <Button variant="primary" onClick={handleSendSms} disabled={!isValidSms || isSending}>
              {isSending ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    Sending...
                </>
              ) : (
                "Send SMS"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
