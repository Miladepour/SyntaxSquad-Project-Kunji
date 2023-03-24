import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import CreateNGO from "./components/CreateNGO";
import BinIcon from "./components/BinIcon";
import PenPaperIcon from "./components/PenPaperIcon";

export function NGOs() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ngos, setNGOs] = useState([]);
  const [singleNGO, setSingleNGO] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState([false, 0]);
  const [formAction, setFormAction] = useState("");

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
    setShowFormModal(true);
  };

  const update = (id) => {
    setFormAction("update");
    setSingleNGO(ngos.filter((ngo) => ngo.id === id));
    setShowFormModal(true);
  };

  const createNGO = (data) => {
    setNGOs([...ngos, data]);
  };

  const updateNGO = (id, data) => {
    setNGOs(ngos.map((ngo) => (ngo.id === id ? data : ngo)));
  };

  const deleteNGO = async (id) => {
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

      }
    } catch (e) {
      console.log(e.message);
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
      }
    </div>
  );
}

export default withAuthenticationRequired(NGOs);