import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/garage4.jpeg";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "../App.css";

function NewBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [services, setServices] = useState([]);
  const preselectedService = location.state?.preselectedService;
  const [serviceType, setServiceType] = useState(preselectedService || "");
  const [bookingDate, setBookingDate] = useState("");
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/services");
        setServices(res.data);
        if (!preselectedService && res.data.length > 0) {
          setServiceType(res.data[0].name);
        }
      } catch (err) {
        console.error("Error fetching services", err);
      }
    };
    fetchServices();
  }, [preselectedService]);

  useEffect(() => {
    if (services.length && serviceType) {
      const selected = services.find((s) => s.name === serviceType);
      if (selected) {
        setSelectedServicePrice(selected.price);
      }
    }
  }, [serviceType, services]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not logged in.");
      return;
    }

    const selectedService = services.find((s) => s.name === serviceType);
    const price = selectedService?.price || 0;

    try {
      const res = await axios.post("http://localhost:3001/api/bookings", {
        user: user._id,
        serviceType,
        bookingDate,
        price,
      });

      alert("Booking created successfully!");
      setBookingDate("");
      navigate("/confirm-booking", { state: { booking: res.data } });
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Card style={{ maxWidth: "500px", width: "100%", padding: "20px" }}>
            <CardBody>
              <h2 className="text-center mb-4">Book a Service</h2>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="serviceType">Service Type</Label>
                  <Input
                    type="select"
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                  >
                    {services.map((service) => (
                      <option key={service._id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="bookingDate">Booking Date</Label>
                  <Input
                    type="date"
                    id="bookingDate"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </FormGroup>

                <p>
                  <strong>Price:</strong> {selectedServicePrice} OMR
                </p>

                <Button type="submit" color="primary" block>
                  Book Now
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default NewBooking;
