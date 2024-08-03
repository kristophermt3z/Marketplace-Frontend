import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.styles.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">My Products</h2>
      {products.length === 0 ? (
        <p className="product-empty">No products found.</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-list-item">
              <div className="product-details">
                <span className="product-detail">Name: {product.name}</span>
                <span className="product-detail">SKU: {product.sku}</span>
                <span className="product-detail">Quantity: {product.quantity}</span>
              </div>
              <span className="product-price">Price: ${product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
