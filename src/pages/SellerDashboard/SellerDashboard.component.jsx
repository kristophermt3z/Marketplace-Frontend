import React, { useState } from "react";
import CreateProduct from "../../components/CreateProduct/CreateProduct.component";
import ProductList from "../../components/ProductList/ProductList.component";
import "./SellerDashboard.styles.css";

const SellerDashboard = () => {
  const [view, setView] = useState("list");

  return (
    <div className="seller-dashboard">
      <h1 className="dashboard-title">Seller Dashboard</h1>
      <div className="dashboard-buttons">
        <button className="dashboard-button" onClick={() => setView("create")}>
          Create Product
        </button>
        <button className="dashboard-button" onClick={() => setView("list")}>
          View My Products
        </button>
      </div>

      <div className="dashboard-content">
        {view === "create" && <CreateProduct />}
        {view === "list" && <ProductList />}
      </div>
    </div>
  );
};

export default SellerDashboard;
