import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  // Importing Link

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); //to clear any previous error
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem('token', JSON.stringify(response.data.token));

      if (response.data.success) {
        alert("Login successful");
        navigate("/"); // Navigate to the homepage or another page after successful login
      } else {
        setError(response.data.message); // Display error message from the response
      }
    } catch (err) {
      setError(err.message); // Handle any other errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email} // Fixed variable name to match state
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="register-link">
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
