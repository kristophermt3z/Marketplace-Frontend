import React from "react";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navigation.styles.css";

const Navigation = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <Fragment>
      <div className="navigation-container">
        <div className="nav-brand">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-links">
          {isAuthenticated && role === "vendedor" ? (
            <Link to="/seller-dashboard" className="nav-link">
              Dashboard
            </Link>
          ) : (
            <Link to="/" className="nav-link">
              Home
            </Link>
          )}
          {isAuthenticated ? (
            <span className="nav-link" onClick={logout}>
              Logout
            </span>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
