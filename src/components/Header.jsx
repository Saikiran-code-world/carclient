import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API } from "../api";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log(true && JSON.parse(localStorage.getItem("token")))
    const token = true && JSON.parse(localStorage.getItem("token"));
    setIsAuthenticated(token);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://carserver-wioc.onrender.com/user/logout", { withCredentials: true });

      if (data.success) {
        localStorage.removeItem('token')
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" to="/">
          CARVANA
        </div>

        <nav className="nav-items">
          <ul>
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li>
              <Link className="nav-link" to="/cars">
                Cars
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li>

              {isAuthenticated ?
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button> :
                <Link className="nav-link" to="/login">
                  signup
                </Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
