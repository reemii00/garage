import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/garage4.jpeg";
import {
  FaOilCan,
  FaCarBattery,
  FaCarCrash,
  FaCarSide,
  FaSnowflake,
  FaFilter,
  FaTools,
} from "react-icons/fa";
import "../App.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (serviceName) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login", { state: { from: "/book", service: serviceName } });
    } else {
      navigate("/book", { state: { preselectedService: serviceName } });
    }
  };

  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case "Oil Change":
        return <FaOilCan />;
      case "Battery Check":
        return <FaCarBattery />;
      case "Brake Inspection":
        return <FaCarCrash />;
      case "Tire Replacement":
        return <FaCarSide />;
      case "Air Conditioning Check":
        return <FaSnowflake />;
      case "Filter Replacement":
        return <FaFilter />;
      default:
        return <FaTools />;
    }
  };

  return (
    <div
      className="services-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <h2 className="page-title">Available Services</h2>

        {loading ? (
          <p className="loading">Loading services...</p>
        ) : (
          <div className="services-list">
            {services.map((service) => (
              <div className="service-card" key={service._id}>
                <div className="service-icon">
                  {getServiceIcon(service.name)}
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>
                  <strong>Price:</strong> {service.price} OMR
                </p>
                {service.duration && (
                  <p>
                    <strong>Duration:</strong> {service.duration} minutes
                  </p>
                )}
                <button onClick={() => handleBookClick(service.name)}>
                  Book This Service
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
