import { useEffect, useState } from "react";
import fileData from "./data/ngos.json";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import CreateNGO from "./components/CreateNGO";

export default function NGOs() {
  const [ngos, setNGOs] = useState([]);
  const [singleNGO, setSingleNGO] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState([false, 0]);
  const [formAction, setFormAction] = useState("");

  useEffect(() => {
    const getNGOs = () => {
      setNGOs(fileData.sort((a, b) => a.organization.localeCompare(b.organization)));
    }

    getNGOs();
  }, []);

  const create = () => {
    setFormAction("create");
    setShowFormModal(true);
  }

  const update = (id) => {
    setFormAction("update");
    setSingleNGO(ngos.filter(ngo => ngo.id === id));
    setShowFormModal(true);
  }

  const createNGO = (data) => {
    setNGOs([...ngos, dynamicFields(data)]);
  }

  const updateNGO = (id, data) => {
    setNGOs(ngos.map(ngo => (ngo.id === id ? dynamicFields(data) : ngo)));
  }

  const deleteNGO = (id) => {
    setNGOs(ngos.filter(ngo => ngo.id !== id));
    setShowDeleteModal([false, 0]);
  }

  const dynamicFields = (data) => {
    data.services = data.services.map(service => service.service);
    data.contacts = data.contacts.map(contact => contact.contact);
    return data;
  }

  return(
    <>
      <Modal size="lg" show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create NGO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateNGO
            formAction={formAction}
            ngos={ngos}
            singleNGO={singleNGO}
            createNGO={createNGO}
            updateNGO={updateNGO}
            setShowFormModal={setShowFormModal} />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteNGO(showDeleteModal[1])}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <div className="text-center">
        <Button variant="success" onClick={create} className="mb-4">
          Add New
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service</th>
            <th>Zone</th>
            <th>Organization</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Website</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ngos.map((ngo, i) => (
            <tr key={i}>
              <td>
                <Stack gap={3}>
                  {ngo.services.map((service, i) => (
                    <div key={i} className="border">{service}</div>
                  ))}
                </Stack>
              </td>
              <td>{ngo.zone}</td>
              <td>{ngo.organization}</td>
              <td>{ngo.address}</td>
              <td>
                <Stack gap={3}>
                  {ngo.contacts.map((contact, i) => (
                    <div key={i} className="border">{contact}</div>
                  ))}
                </Stack>
              </td>
              <td>{ngo.website}</td>
              <td>{ngo.email}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <svg
                    onClick={() => update(ngo.id)}
                    fill="#fd7e14"
                    viewBox="0 0 16 16"
                    height="2em"
                    width="2em"
                    style={{ cursor: "pointer" }}
                  >
                    <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
                    />
                  </svg>
                  <svg
                    onClick={() => setShowDeleteModal([true, ngo.id])}
                    viewBox="0 0 1024 1024"
                    fill="#dc3545"
                    height="2em"
                    width="2em"
                    style={{ cursor: "pointer" }}
                  >
                    <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                  </svg>
                </Stack>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}