import "../App.css"; // Global CSS styles

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Garage App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
