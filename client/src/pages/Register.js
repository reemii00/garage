import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

import "../App.css";
import backgroundImage from "../assets/garage4.jpeg";

// ✅ Form validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{8,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          role: "car_owner",
        }
      );

      const result = response.data;

      if (response.status === 201 || response.status === 200) {
        dispatch(login(result.user));
        alert("User registered successfully!");
        navigate(
          result.user.role === "admin" ? "/admin-dashboard" : "/my-bookings"
        );
        reset();
      } else {
        alert("Registration failed. Try another email.");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try another email.");
    }
  };

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="page-overlay">
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>

            <label>Full Name</label>
            <input type="text" {...register("name")} />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}

            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}

            <label>Phone Number</label>
            <input type="tel" {...register("phone")} />
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
              />
              <span
                className="toggle-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}

            <button type="submit">Register</button>

            <p className="redirect-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
