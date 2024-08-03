// CreateProduct.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For custom matchers
import CreateProduct from "./CreateProduct.component.jsx";
import * as axios from "axios";
jest.mock("axios"); 

describe("CreateProduct Component", () => {
  beforeEach(() => {
    axios.post.mockClear(); 
  });

  test("renders Create Product form", () => {
    render(<CreateProduct />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("SKU")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Quantity")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByText("Create Product")).toBeInTheDocument();
  });

  test("shows error message when a required field is missing", () => {
    render(<CreateProduct />);
    
    const createButton = screen.getByText("Create Product");
    fireEvent.click(createButton);

    expect(screen.getByText("Name is required.")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Product" } });
    fireEvent.click(createButton);

    expect(screen.getByText("SKU is required.")).toBeInTheDocument();
  });

  test("calls API with correct data when form is submitted", async () => {
    axios.post.mockResolvedValue({ data: {} }); // Mock a successful API response

    render(<CreateProduct />);
    
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Product" } });
    fireEvent.change(screen.getByPlaceholderText("SKU"), { target: { value: "SKU123" } });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), { target: { value: "10" } });
    fireEvent.change(screen.getByPlaceholderText("Price"), { target: { value: "99.99" } });
    
    const createButton = screen.getByText("Create Product");
    fireEvent.click(createButton);

    await screen.findByText("Product created successfully.");
    
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/create-products`,
      {
        name: "Test Product",
        sku: "SKU123",
        quantity: 10,
        price: 99.99,
      },
      {
        headers: {
          Authorization: `Bearer null`,
        },
      }
    );
  });
});
