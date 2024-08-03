import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage.component.jsx";
import LoginPage from "./pages/Login/LoginPage.component.jsx";
import Navigation from "./pages/navigation/navigation.component.jsx";
import Home from "./pages/home/home.component.jsx";
import AuthRoute from "./components/AuthRoute/AuthRoute.component.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.components.jsx";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard.component.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.component.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route
            path="seller-dashboard"
            element={
              <ProtectedRoute role="vendedor" redirectTo="/login">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-dashboard"
            element={
              <ProtectedRoute role="admin" redirectTo="/login">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <AuthRoute redirectTo="/">
                <RegisterPage />
              </AuthRoute>
            }
          />
          <Route
            path="login"
            element={
              <AuthRoute redirectTo="/">
                <LoginPage />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
