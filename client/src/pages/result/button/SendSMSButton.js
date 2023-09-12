import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const smsSchema = yup.string().min(10).max(13).required();

export default function SendSmsButton({ sendSms , state }) {
  const { t } = useTranslation();
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
        setErrorMessage(t("errors.sendSMS.1"));
      } else {
        setErrorMessage(t("errors.sendSMS.2"));
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
      <button className="btn text-white m-2" type="button" style={{ backgroundColor: "#004e87", display: "none" }} onClick={handleShow}>
        {isSending ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Sending...
          </>
        ) : (
          t("result.sendSMSBtn")
        )}
      </button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t("result.enterPhone")}</Modal.Title>
          <Modal.Body></Modal.Body>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>SMS sent successfully.</p>
          ) : (
            <>
              <FormControl
                placeholder="(+91xxxxnnnnnn)"
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
            {t("result.closeBtn")}
          </Button>
          {!messageSent && (
            <Button variant="primary" onClick={handleSendSms} disabled={!isValidSms || isSending}>
              {isSending ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    Sending...
                </>
              ) : (
                t("result.sendSMSBtn")
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
