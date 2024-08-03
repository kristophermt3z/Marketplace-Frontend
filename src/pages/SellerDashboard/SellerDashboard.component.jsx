import React, { useState } from "react";
import CreateProduct from "../../components/CreateProduct/CreateProduct.component";
import ProductList from "../../components/ProductList/ProductList.component";

const SellerDashboard = () => {
  const [view, setView] = useState("list");

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <button onClick={() => setView("create")}>Create Product</button>
      <button onClick={() => setView("list")}>View My Products</button>

      {view === "create" && <CreateProduct />}
      {view === "list" && <ProductList />}
    </div>
  );
};

export default SellerDashboard;
