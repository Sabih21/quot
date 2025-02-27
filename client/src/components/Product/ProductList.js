import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productpage.css'; // Custom CSS for styling

function ProductTable() {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('Product deleted successfully!');
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    // <h1>Product List</h1>

    <div className="product-page">
      <table className="product-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Item Code</th>
            <th>HSN Code</th>
            <th>Make</th>
            <th>Unit</th>
            <th>Price/Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.item}</td>
              <td>{product.itemCode}</td>
              <td>{product.hsnCode}</td>
              <td>{product.make}</td>
              <td>{product.unit}</td>
              <td>₹{product.pricePerUnit.toFixed(2)}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;