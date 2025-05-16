import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/garage4.jpeg"; // Background image for the landing page


function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      navigate("/");
      return;
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3001/api/bookings/${bookingId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Status updated");
      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3001/api/bookings/${bookingId}`);
      alert("Booking deleted");
      fetchBookings(); // تحديث القائمة
    } catch (error) {
      console.error("Failed to delete booking", error);
      alert("Failed to delete booking");
    }
  };


  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="admin-page">
        <div className="admin-overlay">
          <h2 className="admin-content">Admin Dashboard</h2>

          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.user?.name || "N/A"}</td>
                    <td>{b.user?.email || "N/A"}</td>
                    <td>{b.serviceType}</td>
                    <td>
                      {new Date(b.bookingDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <span className={`status-badge ${b.status}`}>
                        {b.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      {b.status !== "completed" ? (
                        <select
                          value={b.status}
                          onChange={(e) =>
                            handleStatusChange(b._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="in_service">In Service</option>
                          <option value="completed">Completed</option>
                        </select>
                      ) : (
                        "-"
                      )}
                      <button
                        style={{
                          marginLeft: "0.5rem",
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteBooking(b._id)}
                      >
                        Delete
                      </button>
                      {b.status === "completed" && b.rating?.stars && (
                        <div style={{ marginTop: "0.5rem" }}>
                          <p style={{ margin: "4px 0" }}>
                            <strong>Rating:</strong>{" "}
                            {"⭐".repeat(b.rating.stars)}
                          </p>
                          <p style={{ margin: "4px 0", fontStyle: "italic" }}>
                            “{b.rating.comment}”
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
