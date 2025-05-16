import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/garage4.jpeg";
import "../App.css";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/users/reset-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(result.message || "Reset failed");
      }
    } catch (err) {
      toast.error("Server error");
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
                  <h3 className="text-center mb-4">Reset Password</h3>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email field */}
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-danger mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </FormGroup>

                    {/* New password field with toggle */}
                    <FormGroup>
                      <Label for="newPassword">New Password</Label>
                      <div style={{ position: "relative" }}>
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...register("newPassword")}
                          style={{ paddingRight: "40px" }}
                          invalid={!!errors.newPassword}
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
                          }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {errors.newPassword && (
                        <p className="text-danger mt-1">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </FormGroup>

                    {/* Submit button */}
                    <Button color="primary" type="submit" block>
                      Reset Password
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPassword;
