import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.styles.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/crear-vendedores`,
        {
          email,
          password,
        }
      );
      setSuccesMessage(response.data);
      login(response.data.token);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Seller Registration</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
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
            Password
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
        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {succesMessage && <p className="succes-message">{succesMessage}</p>}
        <div className="form-button-container">
          <button className="form-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
