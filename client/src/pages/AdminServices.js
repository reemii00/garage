import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Table,
} from "reactstrap";
import "../App.css";
import backgroundImage from "../assets/garage4.jpeg";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editingService, setEditingService] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      navigate("/");
    } else {
      fetchServices();
    }
  }, [navigate, user]);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/services");
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(
          `http://localhost:3001/api/services/${editingService._id}`,
          { name, description, price }
        );
        alert("Service updated!");
      } else {
        await axios.post("http://localhost:3001/api/services", {
          name,
          description,
          price,
        });
        alert("Service added!");
      }

      setName("");
      setDescription("");
      setPrice("");
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error("Error saving service", error);
      alert("Error saving service");
    }
  };

  const handleEdit = (service) => {
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setEditingService(service);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/api/services/${id}`);
      alert("Service deleted!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <Container className="py-5">
          <Card>
            <CardBody>
              <h2 className="text-center mb-4">Manage Services</h2>

              {/* Service Form */}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="name">Service Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="price">Price (OMR)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Button color="primary" type="submit" className="mt-2">
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
              </Form>

              {/* Services Table */}
              <h4 className="mt-5 mb-3">All Services</h4>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price (OMR)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id}>
                      <td>{service.name}</td>
                      <td>{service.description || "No description"}</td>
                      <td>{parseFloat(service.price).toFixed(2)}</td>
                      <td>
                        <Button
                          color="warning"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(service._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default AdminServices;
