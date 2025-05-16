import { useLocation, useNavigate } from "react-router-dom";
//import axios from "axios";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import backgroundImage from "../assets/garage4.jpeg";
import "../App.css";
import api from "../api";

function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  // If no booking is passed to the page
  if (!booking) {
    return (
      <div
        className="page-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="page-overlay">
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col md={6}>
                <Card>
                  <CardBody className="text-center">
                    <h2>No Booking Found</h2>
                    <p>Please make a booking first.</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  // Handler for confirming booking
  const handleConfirmBooking = async () => {
    try {
      await api.put(`/bookings/${booking._id}/confirm`);

      alert("Booking confirmed!");
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      alert("Failed to confirm booking.");
    }
  };

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card>
                <CardBody>
                  <h2 className="text-center mb-4">Confirm Booking</h2>
                  <p>
                    <strong>Service:</strong> {booking.serviceType}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Price:</strong> {booking.price} OMR
                  </p>
                  <Button color="primary" block onClick={handleConfirmBooking}>
                    Confirm
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ConfirmBooking;
