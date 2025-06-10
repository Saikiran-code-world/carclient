import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import axios from 'axios';
import { API } from '../api';

const BookingPage = () => {
  const { id } = useParams(); // Get car id from the URL
  const [carDetails, setCarDetails] = useState(null);
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track if the user is logged in
  const [loading, setLoading] = useState(true); // Loading state for login check
  const navigate = useNavigate(); // For redirection

  // Fetch car details based on the car id
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

  // Check if the user is logged in by verifying the token in the cookies
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {

      setIsLoggedIn(false);  
      setLoading(false); 
   
    } else {
      setIsLoggedIn(true); // User is logged in
      setLoading(false); // Done with login check
    }
  }, [navigate]);

  const handleBooking = async () => {
    if (!pickUpDate || !dropOffDate) {
      setError("Please select both pick-up and drop-off dates.");
      return;
    }

    try {
      // Replace with your booking logic
      const response = await axios.post(
        `${API}/booking`, 
        { carId: id, pickUpDate, dropOffDate }, 
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      alert("Car booked successfully!");
    } catch (error) {
      setError("Failed to book the car.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking login
  }

  if (!carDetails) {
    return <div>Loading car details...</div>;
  }

  if (!isLoggedIn) {
    navigate('/login'); 
    return (
      <div>
        <h1>You need to log in to book a car</h1>
        <p>Please log in to proceed.</p>
       
      </div>
    );
  }

  return (
    <div className="booking-page mt-100">
      <h1>Book {carDetails.name}</h1>
      <div className="car-details">
        <p><strong>Price:</strong> {carDetails.price} per day</p>
        <p><strong>Fuel:</strong> {carDetails.fuel}</p>
        <p><strong>Seats:</strong> {carDetails.seaterType}</p>
        <p><strong>Transmission:</strong> {carDetails.transmission}</p>
      </div>
      <div className="input-group">
        <label>
          Pick-up Date:
          <input
            type="date"
            value={pickUpDate}
            onChange={(e) => setPickUpDate(e.target.value)}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Drop-off Date:
          <input
            type="date"
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
          />
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="button-container">
        <button onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default BookingPage;
