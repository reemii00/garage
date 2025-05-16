import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import backgroundImage from "../assets/garage4.jpeg";
import "../App.css";
import LocationInfo from "../components/LocationInfo";

function UserProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    setUserData(user);

    axios
      .get(`http://localhost:3001/api/bookings/user/${user._id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [navigate, user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...userData };
      if (newPassword.trim() !== "") {
        payload.password = newPassword;
      }

      await axios.put(
        `http://localhost:3001/api/users/${userData._id}`,
        payload
      );

      alert("Profile updated successfully!");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (!userData) return null;

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <div className="register-container">
          <form className="register-form" onSubmit={handleUpdate}>
            <h2>User Profile</h2>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
            />

            <label>New Password (leave empty to keep current)</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit">Update Profile</button>

            <p style={{ marginTop: "1rem" }}>
              <strong>Total Bookings:</strong> {bookings.length}
            </p>
          </form>

          <LocationInfo />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
