import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

const SingleCarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${API}/cars/${id}`);
        setCarDetails(response.data.car);
      } catch (error) {
        console.error("Error fetching car details", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Show loading text if carDetails is null
  if (!carDetails) {
    return <div className="loading">Loading...</div>;
  }

  const availabilityStatus = carDetails.available
    ? "Available"
    : "Not Available";
  const buttonDisabled = !carDetails.available;

  // Handle booking button click
  const handleBooking = () => {
      navigate(`/bookings/${id}`);
  };

  return (
    <div className="car-details-card">
      <div className="card-content">
        <div className="car-image-container">
          {carDetails && (
            <img
              src={`http://localhost:4000/${carDetails.carImage}`}
              alt={carDetails.name}
              className="car-image"
            />
          )}
        </div>
        <div className="car-details-container">
          <h2 className="car-name">{carDetails.name}</h2>
          <div className="car-info">
            <p className="price">Price: {carDetails.price}/Perday</p>
            <p className="fuel">Fuel: {carDetails.fuel}</p>
            <p className="seats">Seats: {carDetails.seaterType}</p>
            <p className="transmission">
              Transmission: {carDetails.transmission}
            </p>
            <p className="availability">
              <strong>Availability: </strong>
              {availabilityStatus}
            </p>
          </div>
          <button
            className={`book-btn ${buttonDisabled ? "disabled" : ""}`}
            onClick={handleBooking}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Car Unavailable" : "Book Car"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCarDetails;
