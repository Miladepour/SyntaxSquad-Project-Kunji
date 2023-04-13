import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import CreateNGO from "./components/CreateNGO";
import BinIcon from "./components/BinIcon";
import PenPaperIcon from "./components/PenPaperIcon";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';

export function NGOs() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ngos, setNGOs] = useState([]);
  const [singleNGO, setSingleNGO] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState([false, 0]);
  const [formAction, setFormAction] = useState("");
  const [reqInProcess, setReqInProcess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    async function getNGOs() {
      try {
        const res = await fetch("/api/ngo");

        const ngos = await res.json();
        setNGOs(ngos);

      } catch (e) {
        console.log(e.message);
      }
    }

    getNGOs();
  }, []);

  const create = () => {
    setFormAction("create");
    setReqInProcess(false);
    setErrorAlert(false);
    setShowFormModal(true);
  };

  const update = (id) => {
    setFormAction("update");
    setSingleNGO(ngos.filter((ngo) => ngo.id === id));
    setReqInProcess(false);
    setErrorAlert(false);
    setShowFormModal(true);
  };

  const createNGO = (data, id) => {
    data.id = id;
    setNGOs([...ngos, data]);
  };

  const updateNGO = (id, data) => {
    data.id = id;
    setNGOs(ngos.map((ngo) => (ngo.id === id ? data : ngo)));
  };

  const deleteNGO = async (id) => {
    setReqInProcess(true);
    setErrorAlert(false);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://starter-kit-j5ar.onrender.com/api/",
        },
      });

      const res = await fetch(`/api/ngo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        await res.json();
        setNGOs(ngos.filter((ngo) => ngo.id !== id));
        setShowDeleteModal([false, 0]);
      } else {
        const data = await res.json();
        console.log(data);
        setErrorAlert(true);
        setReqInProcess(false);
      }
    } catch (e) {
      console.log(e.message);
      setErrorAlert(true);
      setReqInProcess(false);
    }
  };

  return(
    <div>
      {isAuthenticated &&
        <>
          <Modal size="lg" show={showFormModal} onHide={() => setShowFormModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{formAction === "create" ? "Create NGO" : "Edit NGO"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateNGO
                formAction={formAction}
                singleNGO={singleNGO}
                createNGO={createNGO}
                updateNGO={updateNGO}
                setShowFormModal={setShowFormModal}
                reqInProcess={reqInProcess}
                setReqInProcess={setReqInProcess}
                errorAlert={errorAlert}
                setErrorAlert={setErrorAlert}
              />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteModal[0]} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure?
              {errorAlert &&
                <Alert className="mt-3" variant="danger">
                  There was a problem. Please try again.
                </Alert>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={() => deleteNGO(showDeleteModal[1])} disabled={reqInProcess}>
              Yes
              {reqInProcess &&
                <Spinner className="ms-2" animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </Button>
            </Modal.Footer>
          </Modal>

          <div className="text-center">
            <Button variant="success" onClick={create} className="mb-4">
              Add New
            </Button>
          </div>

          <Table striped bordered hover style={{ tableLayout: "fixed", wordWrap: "break-word" }}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Zone</th>
                <th>Organization</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Website</th>
                <th>Email</th>
                <th>Email Status</th>
                <th>Call Response</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ngos.map((ngo, i) => (
                <tr key={i}>
                  <td>
                    <Stack gap={3}>
                      {ngo.service.map((service, i) => (
                        <div key={i} className="border">{service}</div>
                      ))}
                    </Stack>
                  </td>
                  <td>{ngo.zone}</td>
                  <td>{ngo.organization}</td>
                  <td>{ngo.address}</td>
                  <td>
                    <Stack gap={3}>
                      {ngo.contact && ngo.contact.map((contact, i) => (
                        <div key={i} className="border">{contact.phone_number} {contact.description}</div>
                      ))}
                    </Stack>
                  </td>
                  <td>{ngo.website}</td>
                  <td>
                    <Stack gap={3}>
                      {ngo.email && ngo.email.map((email, i) => (
                        email && <div key={i} className="border">{email}</div>
                      ))}
                    </Stack>
                  </td>
                  <td>{ngo.email_status}</td>
                  <td>{ngo.call_response}</td>
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      <PenPaperIcon onClick={() => update(ngo.id)} />
                      <BinIcon onClick={() => { setReqInProcess(false); setErrorAlert(false); setShowDeleteModal([true, ngo.id]); }} />
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      }
    </div>
  );
}

export default withAuthenticationRequired(NGOs);