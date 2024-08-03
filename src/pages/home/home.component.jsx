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
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Search by SKU"
          value={searchSku}
          onChange={(e) => setSearchSku(e.target.value)}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Min price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Max price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleFilter} className="filter-button">Filter</button>
        <button onClick={handleResetFilter} className="reset-button">Reset Filter</button>
      </div>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-list-item">
            <div className="product-details">
              <span className="product-detail">Name: {product.name}</span>
              <span className="product-detail">SKU: {product.sku}</span>
              <span className="product-detail">Price: ${product.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
