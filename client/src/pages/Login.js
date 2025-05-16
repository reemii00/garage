// React Hook Form & Yup validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Routing & State
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

// Icons for password toggle
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Styles & assets
import "../App.css";
import backgroundImage from "../assets/garage4.jpeg";

// Validation Schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // ✅ Redux dispatch

  const redirectPath = location.state?.from || "/my-bookings";
  const serviceToBook = location.state?.service || null;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(login(result.user)); // ✅ no localStorage
        alert("Login successful!");

        if (result.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate(redirectPath, {
            state: serviceToBook ? { preselectedService: serviceToBook } : {},
          });
        }
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} />

            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                style={{ width: "100%", paddingRight: "40px" }}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "1.1rem",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            <p style={{ textAlign: "right", marginTop: "0.5rem" }}>
              <a href="/forgot-password" style={{ color: "#007bff" }}>
                Forgot Password?
              </a>
            </p>

            <button type="submit">Login</button>

            <p className="redirect-link">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
