import { useEffect, useState } from "react";

function LocationInfo() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied or unavailable.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div
      style={{ padding: "1rem", background: "#fff", borderRadius: "8px", color: "black" }}
    >
      <h3>Your Location Info</h3>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : location ? (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}

export default LocationInfo;
