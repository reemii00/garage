import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import logo from "../assets/logo2.png";
import "../App.css";

function AppNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar className="navbar" expand="md">
      {/* Logo and App Name */}
      <NavbarBrand className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Garage Logo" className="logo-img" />
          Garage App
        </Link>
      </NavbarBrand>

      {/* Dynamic Links based on user role */}
      <Nav className="navbar-links" navbar>
        {!user ? (
          <>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/register">Register</Link>
            </NavItem>
            <NavItem>
              <Link to="/">About</Link>
            </NavItem>
          </>
        ) : user.role === "admin" ? (
          <>
            <span className="user-name">Hi, {user.name}</span>
            <NavItem>
              <Link to="/admin-dashboard">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/admin-services">Services</Link>
            </NavItem>
            <NavItem>
              <Link to="/admin-payments">Payments</Link>
            </NavItem>
            <NavItem>
              <Button color="danger" onClick={handleLogout}>
                Logout
              </Button>
            </NavItem>
          </>
        ) : (
          <>
            <span className="user-name">Hi, {user.name}</span>
            <NavItem>
              <Link to="/book">Book</Link>
            </NavItem>
            <NavItem>
              <Link to="/services">Services</Link>
            </NavItem>
            <NavItem>
              <Link to="/my-bookings">My Bookings</Link>
            </NavItem>
            <NavItem>
              <Link to="/profile">Profile</Link>
            </NavItem>
            <NavItem>
              <Button color="danger" onClick={handleLogout}>
                Logout
              </Button>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default AppNavbar;
