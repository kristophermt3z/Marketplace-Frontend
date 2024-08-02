import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.styles.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password }
      );
      alert("Login successful: " + response.data.message);
      login(response.data.token); 
      setEmail(""); 
      setPassword("");
      navigate("/");
    } catch (error) {
      alert("Error logging in: " + error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-button-container">
          <button className="form-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <p className="register-prompt">
        Don't have an account?{" "}
        <Link to="/register" className="register-link">
          Create one here
        </Link>
        .
      </p>
    </div>
  );
}

export default LoginPage;
