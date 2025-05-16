import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/garage4.jpeg";
import "../App.css";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  // ✅ Redirect if booking is invalid or already paid
  useEffect(() => {
    if (!booking) return;

    if (booking.status !== "completed") {
      alert("You can only pay after the service is completed.");
      navigate("/my-bookings");
    }

    if (booking.paid) {
      alert("This booking is already paid.");
      navigate("/my-bookings");
    }
  }, [booking, navigate]);

  // ✅ If booking is not passed, show message
  if (!booking) {
    return (
      <div
        className="page-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="page-overlay">
          <Container className="register-container">
            <Card className="register-form">
              <CardBody>
                <CardTitle tag="h2">No Booking Found</CardTitle>
                <CardText>Please make a booking first.</CardText>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    );
  }

  // ✅ Trigger payment (fake)
  const handleFakePayment = async () => {
    try {
      await axios.put(`http://localhost:3001/api/bookings/${booking._id}/pay`);
      alert("Payment successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <Container className="register-container">
          <Card className="register-form">
            <CardBody>
              <CardTitle tag="h2">Confirm Payment</CardTitle>

              <CardText>
                <strong>Service:</strong> {booking.serviceType}
              </CardText>
              <CardText>
                <strong>Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </CardText>
              <CardText>
                <strong>Price:</strong> {booking.price} OMR
              </CardText>

              <Button color="success" onClick={handleFakePayment} block>
                Pay Now
              </Button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default Payment;
