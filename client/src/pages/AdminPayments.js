import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardBody, Table, Alert } from "reactstrap";
import "../App.css";
import backgroundImage from "../assets/garage4.jpeg";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      navigate("/");
      return;
    }
    fetchPayments();
  }, [navigate, user]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/bookings");
      const completedBookings = res.data.filter(
        (b) => b.status === "completed"
      );
      setPayments(completedBookings);
    } catch (error) {
      console.error("Failed to fetch payments", error);
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
              <h2 className="text-center mb-4">
                Completed Services & Payments
              </h2>

              {payments.length === 0 ? (
                <Alert color="warning" className="text-center">
                  No completed services found.
                </Alert>
              ) : (
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Price (OMR)</th>
                      <th>Paid</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p._id}>
                        <td>{p.user?.name || "N/A"}</td>
                        <td>{p.serviceType}</td>
                        <td>{p.price ? `${p.price} OMR` : "—"}</td>
                        <td>{p.paid ? "✅" : "❌"}</td>
                        <td>
                          {new Date(p.bookingDate).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default AdminPayments;
