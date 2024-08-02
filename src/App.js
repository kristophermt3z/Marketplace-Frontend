import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import Navigation from "./pages/navigation/navigation.component.jsx";
import Home from "./pages/home/home.component.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
