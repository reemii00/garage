import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/garage4.jpeg"; // Background image for the landing page
import logo from "../assets/logo2.png"; // Logo image
import "../App.css"; // Global CSS styles

function About() {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Semi-transparent overlay to darken background for better readability */}
      <div className="landing-overlay">
        <div className="landing-content">
          {/* Logo and app title */}
          <div className="logo-heading">
            <img src={logo} alt="Garage Logo" className="logo-img" />
            <h1>Garage App</h1>
          </div>

          {/* Short app description */}
          <p>
            Simplifying vehicle maintenance. Book services, track your car
            history, and manage garage operations all in one place.
          </p>

          {/* Buttons to navigate to login, register, and services */}
          <div className="landing-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button
              onClick={() => navigate("/register")}
              className="btn-outline"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/services")}
              className="btn-explore"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
