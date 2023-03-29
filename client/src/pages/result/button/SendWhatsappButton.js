import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import * as yup from "yup";

const whatsappSchema = yup.string().min(5).max(20).required();

export default function SendWhatsappButton({ sendWhatsapp }) {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isValidWhatsapp, setIsValidWhatsapp] = useState(true);

  function handleClose() {
    setShowModal(false);
    setPhoneNumber("");
    setMessageSent(false);
  }

  function handleShow() {
    setShowModal(true);
    setPhoneNumber("");
    setMessageSent(false);
  }

  async function handleSendWhatsapp() {
    try {
      await whatsappSchema.validate(phoneNumber);
      setIsValidWhatsapp(true);
      sendWhatsapp(phoneNumber);
      setMessageSent(true);
    } catch (error) {
      setIsValidWhatsapp(false);
    }
  }

  async function handleWhatsappChange(e) {
    const newWhatsapp = e.target.value;
    setPhoneNumber(newWhatsapp);

    try {
      await whatsappSchema.validate(newWhatsapp);
      setIsValidWhatsapp(true);
    } catch (error) {
      setIsValidWhatsapp(false);
    }
  }

  return (
    <>
      <button className="btn text-white m-2" type="button" style={{backgroundColor: "#004e87"}} onClick={handleShow}>
        Send Whatsapp
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Enter your telephone number..</Modal.Title>
          <Modal.Body></Modal.Body>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>Whatsapp message sent successfully.</p>
          ) : (
            <>
              <FormControl
                placeholder="Enter your telephone number"
                value={phoneNumber}
                onChange={handleWhatsappChange}
                isInvalid={!isValidWhatsapp}
              />
              {!isValidWhatsapp && (
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
            <Button variant="primary" onClick={handleSendWhatsapp} disabled={!isValidWhatsapp}>
              Send
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
