import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>My Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - SKU: {product.sku} - Quantity: {product.quantity} - Price: {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
