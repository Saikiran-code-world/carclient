import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import SingleCarDetails from "./pages/SingleCarDetails";
import BookingPage from "./pages/BookingPage";

import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/login.scss";
import "./styles/register.scss";
import "./styles/carCard.scss";
import "./styles/cars.scss";
import "./styles/singleCar.scss";
import "./styles/bookingpage.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<SingleCarDetails />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
