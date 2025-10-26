import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getProductDetails();
    }
    // eslint-disable-next-line
  }, [params.id]);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name || "");
    setPrice(result.price || "");
    setCategory(result.category || "");
    setCompany(result.company || "");
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/updateproduct/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result) {
      navigate("/Add")
    } else {
      alert("Product update failed");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <button onClick={updateProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProduct;
