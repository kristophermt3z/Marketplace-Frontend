import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage.component.jsx";
import LoginPage from "./pages/Login/LoginPage.component.jsx";
import Navigation from "./pages/navigation/navigation.component.jsx";
import Home from "./pages/home/home.component.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="registrar-usuario" element={<RegisterPage />} />
          <Route path="iniciar-sesion" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
