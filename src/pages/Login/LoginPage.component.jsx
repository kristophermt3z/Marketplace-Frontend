import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./LoginPage.styles.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password }
      );
      alert("Inicio de sesión correcto: " + response.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.response);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
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
            Contraseña:
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
        ¿No tienes una cuenta?{" "}
        <Link to="/registrar-usuario" className="register-link">
          Crea una aquí
        </Link>
        .
      </p>
    </div>
  );
}

export default LoginPage;
