import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { API } from "../api";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCars = async () => {
    try {
      const response = await axios(`${API}/cars`);
      setCars(response.data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error); // Log the actual error
      setError("Failed to fetch cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="cars-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <h1 className="cars-header">
            Welcome to Carvana! Book your desired car
          </h1>
          <Card cars={cars} />
        </>
      )}
    </div>
  );
};

export default Cars;
