import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const schema = yup.object({
  service: yup.string().min(3).max(50).required().label("Service")
}).required();

export default function CreateNGO({ createNGO, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    createNGO(data);
    handleClose();
  };

  return(
    <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%", margin: "0 auto" }}>
      <Form.Group controlId="service">
        <Row>
          <Col>
            <Form.Label>Service</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="text"
              {...register("service")}
              isInvalid={errors.service?.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.service?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form.Group>

      <div className="container-btn" style={{ margin: "30px 0px 0px 0px" }}>
        <Button variant="success" type="submit">
          Create
        </Button>
      </div>
    </Form>
  );
}