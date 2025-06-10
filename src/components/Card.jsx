import { useNavigate } from "react-router-dom";

const CarCard = ({ cars }) => {
  const navigate = useNavigate();

  const handleClick = (car) => {
    navigate(`/cars/${car._id}`);
  };

  return (
    <div className="car-container">
      {cars.map((car, index) => (
        <div key={index} className="car-card">
          <div className="car-card-header">
            <h2 className="car-name">{car.name}</h2>
            <p className="car-segment">{car.segment}</p>
          </div>
          <div className="car-card-body">
            <img
              src={`https://carserver-wioc.onrender.com/${car.carImage}`}
              alt={car.name}
              className="car-image"
              loading="lazy"
            />
            <p className="car-price">${car.price}</p>
            <p className="car-fuel">Fuel: {car.fuel}</p>
            <p className="car-seater">Seats: {car.seaterType}</p>
            <p className="car-transmission">Transmission: {car.transmission}</p>
            <button className="car-btn" onClick={() => handleClick(car)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarCard;
