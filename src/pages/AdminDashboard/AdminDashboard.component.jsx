import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.styles.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/all-products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterBySeller = () => {
    if (sellerId) {
      setFilteredProducts(
        products.filter((product) => product.seller && product.seller.id === parseInt(sellerId))
      );
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-filter-container">
        <input
          type="text"
          placeholder="Filter by Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          className="admin-filter-input"
        />
        <button onClick={handleFilterBySeller} className="admin-filter-button">
          Filter
        </button>
      </div>
      <div className="admin-product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="admin-product-card">
            <div className="admin-product-details">
              <span className="admin-product-detail">Name: {product.name}</span>
              <span className="admin-product-detail">SKU: {product.sku}</span>
              <span className="admin-product-detail">Price: ${product.price}</span>
              <span className="admin-product-seller">
                Seller ID: {product.seller ? product.seller.id : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
