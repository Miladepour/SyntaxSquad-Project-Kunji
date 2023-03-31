import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";

const smsSchema = yup.string().min(13).max(13).required();

export default function SendSmsButton({ sendSms , state }) {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isValidSms, setIsValidSms] = useState(true);
  const [update,setUpdate]=useState(state?.phoneNumber);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleClose() {
    setShowModal(false);
    setPhoneNumber("");
    setMessageSent(false);
    setIsSending(false);
    setErrorMessage("");
  }

  function handleShow() {
    setShowModal(true);
    setPhoneNumber("");
    setMessageSent(false);
    setIsSending(false);
    setErrorMessage("");
  }

  async function handleSendSms() {
    try {
      await smsSchema.validate(update);
      setIsValidSms(true);
      setIsSending(true);
      await sendSms(update);
      setMessageSent(true);
      setUpdate(state?.phoneNumber);
    } catch (error) {
      setIsValidSms(false);
      if (error.status >= 400 && error.status < 500) {
        setErrorMessage("Invalid phone number or SMS sending failed.");
      } else {
        setErrorMessage("An error occurred while sending the SMS.");
      }
    } finally {
      setIsSending(false);
    }
  }

  async function handleSmsChange(e) {
    setUpdate("");
    const newSms = e.target.value;
    setUpdate(newSms);

    try {
      await smsSchema.validate(update);
      setIsValidSms(true);
      setErrorMessage(null);
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
            <p>SMS sent successfully to {update} </p>
          ) : (
            <>
              <FormControl
                placeholder="Enter phone number ( Ex. +9199999999999 )"
                value={update}
                onChange={handleSmsChange}
                isInvalid={!isValidSms}
              />
              {!isValidSms && (
                <div className="invalid-feedback">Please enter a valid telephone number.</div>
              )}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
