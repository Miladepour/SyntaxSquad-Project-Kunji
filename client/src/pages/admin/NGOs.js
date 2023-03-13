import { useEffect, useState } from "react";
import fileData from "./data/ngos.json";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CreateNGO from "./components/CreateNGO";

export default function NGOs() {
  const [ngos, setNGOs] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getNGOs = () => {
      setNGOs(fileData);
    }

    getNGOs();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const createNGO = (ngo) => {
    setNGOs([...ngos, ngo]);
  }

  return(
    <Container>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create NGO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateNGO createNGO={createNGO} handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Button variant="success" onClick={handleShow} style={{ marginBottom: "30px" }}>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}