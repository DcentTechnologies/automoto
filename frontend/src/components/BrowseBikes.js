import React, { useState, useEffect } from "react";
import "./browseBikes.css";
import API from "../utils/axiosInstance";
import Navbar from "./Navbar";

const BrowseBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const { data } = await API.get("/api/bikes/bikes");
        setBikes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) {
    return <div>Loading bikes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Navbar />
    <div className="browse-container">
      <h2>Available Bikes</h2>
      <div className="bike-grid">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <div className="bike-card" key={bike._id}>
              {console.log(`http://localhost:5000${bike.image}`)}
              <img src={`http://localhost:5000${bike.image}`} alt={bike.title} className="bike-image" />
              <div className="bike-info">
                <h3>{bike.title}</h3>
                <p>{bike.brand} - {bike.model}</p>
                <p>Price: ₹{bike.price}</p>
                <p>Mileage: {bike.mileage} km</p>
                <p>Year: {bike.year}</p>
                <p>{bike.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No bikes available</p>
        )}
      </div>
    </div>
    </>
  );
};

export default BrowseBikes;