import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/garage4.jpeg";
import "../App.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/bookings/user/${user._id}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  

  const handlePayment = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/bookings/${id}/pay`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Payment failed");
      alert("Payment successful!");
      fetchBookings();
    } catch (error) {
      alert("Payment error");
    }
  };

  const submitRating = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/bookings/${selectedBookingId}/rate`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stars, comment }),
        }
      );
      if (!res.ok) throw new Error("Failed to submit rating");
      alert("Rating submitted!");
      setShowModal(false);
      setStars(5);
      setComment("");
      fetchBookings();
    } catch (err) {
      alert("Error submitting rating");
    }
  };

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <div className="my-bookings-wrapper">
          <h2 className="page-title">My Bookings</h2>

          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="booking-list-container">
              {bookings.map((booking) => (
                <div className="booking-card" key={booking._id}>
                  <p>
                    <strong>Service:</strong> {booking.serviceType}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <p>
                    <strong>Paid:</strong> {booking.paid ? "✔️" : "❌"}
                  </p>

                  {booking.status === "completed" && !booking.paid && (
                    <button
                      className="btn-pay"
                      onClick={() => handlePayment(booking._id)}
                    >
                      Pay Now
                    </button>
                  )}

                  {booking.status === "completed" &&
                    booking.paid &&
                    !booking.rating && (
                      <button
                        className="btn-rate"
                        onClick={() => {
                          setSelectedBookingId(booking._id);
                          setShowModal(true);
                        }}
                      >
                        Rate Service
                      </button>
                    )}

                  {booking.rating && (
                    <>
                      <p>
                        <strong>Rating:</strong>{" "}
                        {"⭐".repeat(booking.rating.stars)}
                      </p>
                      <p>
                        <strong>Comment:</strong> {booking.rating.comment}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ✅ Modal always rendered, just toggled via display */}
          <div
            className="modal"
            style={{ display: showModal ? "flex" : "none", zIndex: 9999 }}
          >
            <div className="modal-content">
              <h3>Rate the Service</h3>
              <label>Stars:</label>
              <select
                value={stars}
                onChange={(e) => setStars(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((s) => (
                  <option key={s} value={s}>
                    {s} ⭐
                  </option>
                ))}
              </select>

              <label style={{ marginTop: "1rem" }}>Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
              />

              <div style={{ marginTop: "1rem" }}>
                <button className="btn-rate" onClick={submitRating}>
                  Submit
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
