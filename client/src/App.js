import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


import Login from "./pages/Login";
import Register from "./pages/Register";
import NewBooking from "./pages/NewBooking";
import MyBookings from "./pages/MyBookings";
import UserProfile from "./pages/UserProfile";
import Services from "./pages/Services";
import Payment from "./pages/Payment";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmBooking from "./pages/ConfirmBooking";


import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminPayments from "./pages/AdminPayments";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* الصفحات العامة */}
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* صفحات المستخدم */}
        <Route
          path="/book"
          element={
            <ProtectedRoute role="car_owner">
              <NewBooking />
            </ProtectedRoute>
          }
        />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="car_owner">
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="car_owner">
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* صفحات الأدمن */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-services"
          element={
            <ProtectedRoute role="admin">
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-payments"
          element={
            <ProtectedRoute role="admin">
              <AdminPayments />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
