import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.styles.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/crear-vendedores`, {
        email,
        password,
      });
      alert("Usuario registrado exitosamente");
    } catch (error) {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="register-container">
    <h1 className="register-title">Seller Registration</h1>
    <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="password" className="form-label">Password</label>
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
            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
            <input
                id="confirm-password"
                className="form-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-button-container">
            <button className="form-button" type="submit">Register</button>
        </div>
    </form>
</div>


  );
}

export default RegisterPage;
