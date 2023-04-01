import { useAuth0 } from "@auth0/auth0-react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BinIcon from "./BinIcon";
import PlusIcon from "./PlusIcon";
import Spinner from "react-bootstrap/Spinner";
import Alert from 'react-bootstrap/Alert';
import fieldData from "../../../../../data/fieldData";

const schema = yup.object({
  service: yup.array().min(1, "Please add at least one service.").of(
    yup.object().shape({
      service: yup.string().required("Please select a service.").label("Service"),
    })
  ),
  zone: yup.string().required("Please select zone.").label("Zone"),
  organization: yup.string().min(3).max(100).required().label("Organization"),
  address: yup.string().min(3).max(300).required().label("Address"),
  contact: yup.array().min(1, "Please add at least one contact.").of(
    yup.object().shape({
      phone_number: yup.string().min(3).max(50).required().label("Phone Number")
    })
  ),
  website: yup.string().min(3).max(50).required().label("Website"),
  email: yup.string().email().min(3).max(256).required().label("Email"),
  email_status: yup.string().min(3).max(50).required().label("Email Status"),
  call_response: yup.string().min(3).max(50).required().label("Call Response"),
}).required();

export default function CreateNGO({ formAction, singleNGO, createNGO, updateNGO, setShowFormModal, reqInProcess, setReqInProcess, errorAlert, setErrorAlert }) {
  const { getAccessTokenSilently } = useAuth0();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      service: formAction === "update" ? singleNGO[0].service.map((service) => {
        return { service };
      }) : [{ service: "" }],
      zone: formAction === "update" ? singleNGO[0].zone : "",
      organization: formAction === "update" ? singleNGO[0].organization : "",
      address: formAction === "update" ? singleNGO[0].address : "",
      contact: formAction === "update" && singleNGO[0].contact ? singleNGO[0].contact.map((contact) => {
        return { phone_number: contact.phone_number, description: contact.description };
      }) : [{ phone_number: "", description: "" }],
      website: formAction === "update" ? singleNGO[0].website : "",
      email: formAction === "update" ? singleNGO[0].email : "",
      email_status: formAction === "update" ? singleNGO[0].email_status : "",
      call_response: formAction === "update" ? singleNGO[0].call_response : "",
    },
  });
console.log(errors);
  const {
    fields: serviceFields,
    append: serviceAppend,
    remove: serviceRemove,
  } = useFieldArray({ control, name: "service" });

  const {
    fields: contactFields,
    append: contactAppend,
    remove: contactRemove,
  } = useFieldArray({ control, name: "contact" });

  const onSubmit = async (data) => {
    const newData = { ...data };
    newData.service = data.service.map((service) => service.service);
    setReqInProcess(true);
    setErrorAlert(false);

    console.log("hi");

    if (formAction === "create") {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://starter-kit-j5ar.onrender.com/api/",
          },
        });

        const res = await fetch("/api/ngo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newData),
        });

        if (res.status === 200) {
          const data = await res.json();
          createNGO(data, data.id);
          setShowFormModal(false);
        } else {
          const data = await res.json();
          console.log(data);
          setReqInProcess(false);
          setErrorAlert(true);
        }
      } catch (e) {
        console.log(e.message);
        setReqInProcess(false);
        setErrorAlert(true);
      }
    }
    if (formAction === "update") {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://starter-kit-j5ar.onrender.com/api/",
          },
        });

        const res = await fetch(`/api/ngo/${singleNGO[0].id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newData),
        });

        if (res.status === 200) {
          await res.json();
          updateNGO(singleNGO[0].id, newData);
          setShowFormModal(false);
        } else {
          const data = await res.json();
          console.log(data);
          setReqInProcess(false);
          setErrorAlert(true);
        }
      } catch (e) {
        console.log(e.message);
        setReqInProcess(false);
        setErrorAlert(true);
      }
    }
  };

  return (
    <Form className="w-75 mx-auto mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5>Services</h5>
        <p className="text-danger">{errors?.service?.message}</p>
        {serviceFields.map((field, index) => (
          <Row key={field.id} className="mb-3">
            <Col>
              <Form.Select
                aria-label="gender"
                {...register(`service.${index}.service`)}
                isInvalid={errors?.['service']?.[index]?.['service']?.['message']}
              >
                <option value="">Select...</option>
                {fieldData.services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors?.['service']?.[index]?.['service']?.['message']}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <BinIcon onClick={() => serviceRemove(index)} />
            </Col>
          </Row>
        ))}
        <Row>
          <Col className="mb-3" style={{ textAlign: "right" }}>
            <Button variant="outline-primary" size="sm" onClick={() => serviceAppend({ service: "" })}>
              <PlusIcon />
              Add New
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </div>

      <Form.Group className="mb-3" controlId="zone">
        <Row>
          <Col>
            <Form.Label>Zone</Form.Label>
          </Col>
          <Col>
            <Form.Select
              aria-label="zone"
              {...register("zone")}
              isInvalid={errors?.zone}
            >
              <option value="">Select...</option>
              <option value="North">North</option>
              <option value="East">East</option>
              <option value="South">South</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.zone?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="organization">
        <Row>
          <Col>
            <Form.Label>Organization</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("organization")}
              isInvalid={errors.organization?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.organization?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Row>
          <Col>
            <Form.Label>Address</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("address")}
              isInvalid={errors.address?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <div>
        <h5>Contacts</h5>
        <p className="text-danger">{errors?.contact?.message}</p>
        {contactFields.map((field, index) => (
          <Row key={field.id} className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                {...register(`contact.${index}.phone_number`)}
                isInvalid={errors?.['contact']?.[index]?.['phone_number']?.['message']}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.['contact']?.[index]?.['phone_number']?.['message']}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Description"
                {...register(`contact.${index}.description`)}
              />
            </Col>
            <Col>
              <BinIcon onClick={() => contactRemove(index)} />
            </Col>
          </Row>
        ))}
        <Row>
          <Col className="mb-3" style={{ textAlign: "right" }}>
            <Button variant="outline-primary" size="sm" onClick={() => contactAppend({ phone_number: "", description: "" })}>
              <PlusIcon />
              Add New
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </div>

      <Form.Group className="mb-3" controlId="website">
        <Row>
          <Col>
            <Form.Label>Website</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("website")}
              isInvalid={errors.website?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.website?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("email")}
              isInvalid={errors.email?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email_status">
        <Row>
          <Col>
            <Form.Label>Email Status</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("email_status")}
              isInvalid={errors.email_status?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email_status?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="call_response">
        <Row>
          <Col>
            <Form.Label>Call Response</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("call_response")}
              isInvalid={errors.call_response?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.call_response?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <div className="container-btn mt-4 mb-2">
        {formAction === "create" &&
          <Button variant="success" type="submit" disabled={reqInProcess}>
            Add
            {reqInProcess &&
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
          </Button>}
        {formAction === "update" && 
          <Button variant="warning" type="submit" disabled={reqInProcess}>
            Save
            {reqInProcess &&
              <Spinner className="ms-2" animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
          </Button>}

        {errorAlert &&
          <Alert className="mt-3" variant="danger">
            There was a problem. Please try again.
          </Alert>}
      </div>
    </Form>
  );
}