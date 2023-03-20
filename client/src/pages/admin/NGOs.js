import { useEffect, useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import fileData from "./data/ngos.json";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import CreateNGO from "./components/CreateNGO";
import BinIcon from "./components/BinIcon";
import PenPaperIcon from "./components/PenPaperIcon";

export function NGOs() {
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
    return data;
  }

  return(
    <>
      <Modal size="lg" show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formAction === "create" ? "Create NGO" : "Edit NGO"}</Modal.Title>
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
                    <div key={i} className="border">{contact.contact} {contact.description}</div>
                  ))}
                </Stack>
              </td>
              <td>{ngo.website}</td>
              <td>{ngo.email}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <PenPaperIcon onClick={() => update(ngo.id)} />
                  <BinIcon onClick={() => setShowDeleteModal([true, ngo.id])} />
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default withAuthenticationRequired(NGOs);