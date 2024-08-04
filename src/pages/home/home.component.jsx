import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.styles.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSku, setSearchSku] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

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

  const handleFilter = () => {
    let filtered = products;

    if (searchName) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchSku) {
      filtered = filtered.filter((product) =>
        product.sku.toLowerCase().includes(searchSku.toLowerCase())
      );
    }

    if (priceMin) {
      filtered = filtered.filter((product) => product.price >= parseFloat(priceMin));
    }

    if (priceMax) {
      filtered = filtered.filter((product) => product.price <= parseFloat(priceMax));
    }

    setFilteredProducts(filtered);
  };

  const handleResetFilter = () => {
    setSearchName("");
    setSearchSku("");
    setPriceMin("");
    setPriceMax("");
    setFilteredProducts(products);
  };

  return (
    <div className="home-container">
      <h1>All Products</h1>
      <div className="home-filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="home-filter-input"
        />
        <input
          type="text"
          placeholder="Search by SKU"
          value={searchSku}
          onChange={(e) => setSearchSku(e.target.value)}
          className="home-filter-input"
        />
        <input
          type="number"
          placeholder="Min price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          className="home-filter-input"
        />
        <input
          type="number"
          placeholder="Max price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="home-filter-input"
        />
        <button onClick={handleFilter} className="home-filter-button">Filter</button>
        <button onClick={handleResetFilter} className="home-reset-button">Reset Filter</button>
      </div>
      <div className="home-product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="home-product-card">
            <img
              src="https://images.unsplash.com/photo-1633683788767-ac390c4bf988?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={product.name}
              className="home-product-image"
            />
            <div className="home-product-details">
              <span className="home-product-detail">Name: {product.name}</span>
              <span className="home-product-detail">SKU: {product.sku}</span>
              <span className="home-product-detail">Price: ${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
