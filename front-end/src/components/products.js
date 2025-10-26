import React from "react";
import { useNavigate } from "react-router-dom"; // <-- to go back to list

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    setError(false);
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    let result = await fetch("http://localhost:5000/productAdd", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result) {
      alert("Product added successfully!");
      // ✅ Clear input fields
      setName("");
      setPrice("");
      setCategory("");
      setCompany("");
      // ✅ Redirect to product list
      navigate("/");
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>

      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span style={{ color: "red" }}>Product name is required</span>}

      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span style={{ color: "red" }}>Price is required</span>}

      <input
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span style={{ color: "red" }}>Category is required</span>}

      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span style={{ color: "red" }}>Company is required</span>}

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
