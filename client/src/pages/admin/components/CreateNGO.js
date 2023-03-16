import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BinIcon from "./BinIcon";
import PlusIcon from "./PlusIcon";

const schema = yup.object({
  services: yup.array().min(1, "Please add at least one service.").of(
    yup.object().shape({
      service: yup.string().required("Please select a service.").label("Service")
    })
  ),
  zone: yup.string().required("Please select zone.").label("Zone"),
  organization: yup.string().min(3).max(100).required().label("Organization"),
  address: yup.string().min(3).max(100).required().label("Address"),
  contacts: yup.array().min(1, "Please add at least one contact.").of(
    yup.object().shape({
      contact: yup.string().min(3).max(50).required().label("Contact"),
    })
  ),
  website: yup.string().min(3).max(50).required().label("Website"),
  email: yup.string().email().min(3).max(50).required().label("Email"),
}).required();

export default function CreateNGO({ formAction, ngos, singleNGO, createNGO, updateNGO, setShowFormModal}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      services: formAction === "update" ? singleNGO[0].services.map(service => { return { service } }) : [{ service: "" }],
      zone: formAction === "update" ? singleNGO[0].zone : "",
      organization: formAction === "update" ? singleNGO[0].organization : "",
      address: formAction === "update" ? singleNGO[0].address : "",
      contacts: formAction === "update" ? singleNGO[0].contacts.map(contact => { return { contact: contact.contact, description: contact.description } }) : [{ contact: "", description: "" }],
      website: formAction === "update" ? singleNGO[0].website : "",
      email: formAction === "update" ? singleNGO[0].email : "",
    }
  });

  const {
    fields: serviceFields,
    append: serviceAppend,
    remove: serviceRemove
  } = useFieldArray({ control, name: "services" });

  const {
    fields: contactFields,
    append: contactAppend,
    remove: contactRemove
  } = useFieldArray({ control, name: "contacts" });

  const onSubmit = (data) => {
    if (formAction === "create") {
      const id = ngos.length > 1 ? ngos[ngos.length - 1].id + 1 : 1;

      createNGO({ ...data, id });
      setShowFormModal(false);
    }
    if (formAction === "update") {
      updateNGO(singleNGO[0].id, data);
      setShowFormModal(false);
    }
  };

  return(
    <Form className="w-75 mx-auto mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5>Services</h5>
        <p className="text-danger">{(errors.services && errors.services.message) && errors.services.message}</p>
        {serviceFields.map((field, index) => (
          <Row key={field.id} className="mb-3">
            <Col>
              <Form.Select
                aria-label="gender"
                {...register(`services.${index}.service`)}
                isInvalid={(errors.services && errors.services[index]) ? true : false}
              >
                <option value="">Select...</option>
                <option value="Legal Aid">Legal Aid</option>
                <option value="Employment & Life Skills">Employment & Life Skills</option>
                <option value="Drug De-Addiction">Drug De-Addiction</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {(errors.services && errors.services[index]) && errors.services[index].service.message}
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
        <p className="text-danger">{(errors.contacts && errors.contacts.message) && errors.contacts.message}</p>
        {contactFields.map((field, index) => (
          <Row key={field.id} className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Contact"
                {...register(`contacts.${index}.contact`)}
                isInvalid={(errors.contacts && errors.contacts[index]) ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {(errors.contacts && errors.contacts[index]) && errors.contacts[index].contact.message}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Description"
                {...register(`contacts.${index}.description`)}
              />
            </Col>
            <Col>
              <svg
                onClick={() => contactRemove(index)}
                viewBox="0 0 1024 1024"
                fill="#dc3545"
                height="2em"
                width="2em"
                className="me-1"
                style={{ cursor: "pointer" }}
              >
                <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
              </svg>
            </Col>
          </Row>
        ))}
        <Row>
          <Col className="mb-3" style={{ textAlign: "right" }}>
            <Button variant="outline-primary" size="sm" onClick={() => contactAppend({ contact: "", description: "" })}>
              <svg
                viewBox="0 0 1024 1024"
                fill="#0d6efd"
                height="1em"
                width="1em"
                style={{ marginRight: "5px" }}
              >
                <defs>
                  <style />
                </defs>
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
              </svg>
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

      <div className="container-btn mt-4 mb-2">
        {formAction === "create" && <Button variant="success" type="submit">Add</Button>}
        {formAction === "update" && <Button variant="warning" type="submit">Save</Button>}
      </div>
    </Form>
  );
}