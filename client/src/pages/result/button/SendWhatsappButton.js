import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import * as yup from "yup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";

const whatsappSchema = yup.string().min(10).max(13).required();

export default function SendWhatsappButton({ sendWhatsapp, state }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [update,setUpdate]=useState(state?.phoneNumber);
  const [isValidWhatsapp, setIsValidWhatsapp] = useState(true);
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

  async function handleSendWhatsapp() {
    try {
      await whatsappSchema.validate(update);
      setIsValidWhatsapp(true);
      setIsSending(true);
      await sendWhatsapp(update);
      setMessageSent(true);
      setUpdate(state?.phoneNumber);
    } catch (error) {
      setIsValidWhatsapp(false);
      if (error.status >= 400 && error.status < 500) {
        setErrorMessage(t("errors.sendWhatsApp.1"));
      } else {
        setErrorMessage(t("errors.sendWhatsApp.2"));
      }
    } finally {
      setIsSending(false);
    }
  }

  async function handleWhatsappChange(e) {
    setUpdate("");
    const newWhatsapp = e.target.value;
    setUpdate(newWhatsapp);

    try {
      await whatsappSchema.validate(update);
      setIsValidWhatsapp(true);
    } catch (error) {
      setIsValidWhatsapp(false);
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
            t("result.sendWhatsAppBtn")
        )}
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t("result.enterWhatsApp")}</Modal.Title>
          <Modal.Body></Modal.Body>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>Whatsapp message sent successfully.</p>
          ) : (
            <>
              <FormControl
                placeholder="(+91xxxxnnnnnn)"
                value={update}
                onChange={handleWhatsappChange}
                isInvalid={!isValidWhatsapp}
              />
              {!isValidWhatsapp && (
                <div className="invalid-feedback">Please enter a valid telephone number.</div>
              )}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("result.closeBtn")}
          </Button>
          {!messageSent && (
            <Button variant="primary" onClick={handleSendWhatsapp} disabled={!isValidWhatsapp}>
              {t("result.sendWhatsAppBtn")}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
