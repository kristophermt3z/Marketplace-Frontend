import React, { useState } from "react";
import axios from "axios";
import "./CreateProduct.styles.css";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required.");
      return;
    }
    if (!sku) {
      setError("SKU is required.");
      return;
    }
    if (!quantity) {
      setError("Quantity is required.");
      return;
    }
    if (!price) {
      setError("Price is required.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/create-products`,
        {
          name,
          sku,
          quantity: parseInt(quantity),
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product created successfully.");
      setName("");
      setSku("");
      setQuantity("");
      setPrice("");
      setError("");
    } catch (err) {
      console.log(err);
      setError("Error creating product.");
    }
  };

  return (
    <div className="create-product-container">
      <h2 className="create-product-title">Create Product</h2>
      {error && <p className="create-product-error">{error}</p>}
      <form className="create-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="create-product-input"
        />
        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="create-product-input"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="create-product-input"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="create-product-input"
        />
        <button type="submit" className="create-product-button">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
