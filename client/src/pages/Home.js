import { Link } from "react-router-dom";
import heroImg from "../assets/garage.jpg"; // Add an actual image in this path

function Home() {
  return (
    <div className="relative w-full h-screen bg-gray-900 text-white">
      <img
        src={heroImg}
        alt="Garage"
        className="absolute w-full h-full object-cover opacity-30"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Garage App
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-xl">
          Book your car maintenance service with trusted professionals.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 px-6 py-3 rounded text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded hover:bg-white transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
