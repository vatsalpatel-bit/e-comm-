import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products-list");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/deleteproduct/${id}`, {
      method: "DELETE",
    });
    result = await result.json();

    if (result.deletedCount > 0) {
      alert("Product deleted successfully");
      getProducts();
    } else {
      alert("Product not found");
    }
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    setSearchKey(key);

    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>

    
      <input
        type="text"
        placeholder="Search products..."
        value={searchKey}
        onChange={handleSearch}
        className="search-box"
      />

      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-btn"
                    onClick={() => navigate(`/update/${item._id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No products found</h3>
      )}
    </div>
  );
};

export default ProductsList;
