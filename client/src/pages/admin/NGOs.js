import { useEffect, useState } from "react";
import fileData from "./data/ngos.json";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CreateNGO from "./components/CreateNGO";

export default function NGOs() {
  const [ngos, setNGOs] = useState([]);
  const [singleNGO, setSingleNGO] = useState([]);
  const [show, setShow] = useState(false);
  const [formAction, setFormAction] = useState("");

  useEffect(() => {
    const getNGOs = () => {
      setNGOs(fileData);
    }

    getNGOs();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const create = () => {
    setFormAction("create");
    handleShow();
  }

  const update = (id) => {
    setFormAction("update");
    setSingleNGO(ngos.filter(ngo => ngo.id === id));
    handleShow();
  }

  const createNGO = (data) => {
    setNGOs([...ngos, data]);
  }

  const updateNGO = (id, data) => {
    setNGOs(ngos.map(ngo => (ngo.id === id ? data : ngo)));
  }

  return(
    <Container>
      <Modal size="lg" show={show} onHide={handleClose}>
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
            handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Button variant="success" onClick={create} style={{ marginBottom: "30px" }}>
        Create
      </Button>

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
              <td>{ngo.service}</td>
              <td>{ngo.zone}</td>
              <td>{ngo.organization}</td>
              <td>{ngo.address}</td>
              <td>{ngo.contact}</td>
              <td>{ngo.website}</td>
              <td>{ngo.email}</td>
              <td>
                <Button variant="warning" onClick={() => update(ngo.id)}>
                  Update
                </Button>
                <Button variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}