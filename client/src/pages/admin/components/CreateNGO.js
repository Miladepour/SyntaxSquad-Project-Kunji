import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const schema = yup.object({
  services: yup.array().min(1, "Please select at least one service.").of(
    yup.object().shape({
      service: yup.string().required("Please select a service.").label("Service")
    })
  ),
  zone: yup.string().required("Please select zone.").label("Zone"),
  organization: yup.string().min(3).max(100).required().label("Organization"),
  address: yup.string().min(3).max(100).required().label("Address"),
  contacts: yup.array().min(1, "Please enter at least one contact.").of(
    yup.object().shape({
      contact: yup.string().min(3).max(50).required().label("Contact")
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
      services: formAction === "update" ? singleNGO[0].services.map(service => { return { service } }) : null,
      zone: formAction === "update" ? singleNGO[0].zone : "",
      organization: formAction === "update" ? singleNGO[0].organization : "",
      address: formAction === "update" ? singleNGO[0].address : "",
      contacts: formAction === "update" ? singleNGO[0].contacts.map(contact => { return { contact } }) : null,
      website: formAction === "update" ? singleNGO[0].website : "",
      email: formAction === "update" ? singleNGO[0].email : "",
    }
  });

  console.log(errors);

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
              {/* <Form.Control
                type="text"
                {...register(`services.${index}.service`)}
                isInvalid={(errors.services && errors.services[index]) ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {(errors.services && errors.services[index]) && errors.services[index].service.message}
              </Form.Control.Feedback> */}
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
              <Button variant="danger" onClick={() => serviceRemove(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <Button className="mb-3" variant="primary" onClick={() => serviceAppend({ service: "" })}>
          Create Service
        </Button>
      </div>

      {/* <Form.Group className={styles.formGroup} controlId="gender">
        <Form.Label>Gender</Form.Label>
        <div className="w-50">
          <Form.Select
            aria-label="gender"
            {...register("gender")}
            isInvalid={errors?.gender}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender?.message}
          </Form.Control.Feedback>
        </div>
      </Form.Group> */}

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
                {...register(`contacts.${index}.contact`)}
                isInvalid={(errors.contacts && errors.contacts[index]) ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {(errors.contacts && errors.contacts[index]) && errors.contacts[index].contact.message}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => contactRemove(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <Button className="mb-3" variant="primary" onClick={() => contactAppend({ contact: "" })}>
          Create Contact
        </Button>
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
        {formAction === "create" && <Button variant="success" type="submit">Create</Button>}
        {formAction === "update" && <Button variant="warning" type="submit">Update</Button>}
      </div>
    </Form>
  );
}