import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !sku || !quantity || !price) {
      setError("All fields are required (name, sku, quantity, price).");
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
    } catch (err) {
      console.log(err);
      setError("Error creating product.");
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
