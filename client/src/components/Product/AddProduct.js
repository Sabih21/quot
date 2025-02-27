import React, { useState } from 'react';
import axios from 'axios';
import './addproduct.css'; // Custom CSS for styling

function AddProduct() {
  const [item, setItem] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [make, setMake] = useState('');
  const [unit, setUnit] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      item,
      itemCode,
      hsnCode,
      make,
      unit,
      pricePerUnit: parseFloat(pricePerUnit),
    };

    axios
      .post('http://localhost:5000/api/products', newProduct)
      .then((response) => {
        alert('Product added successfully!');
        // Clear the form after submission
        setItem('');
        setItemCode('');
        setHsnCode('');
        setMake('');
        setUnit('');
        setPricePerUnit('');
      })
      .catch((error) => {
        console.error('There was an error creating the product!', error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Add New Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="item">Item:</label>
            <input
              id="item"
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemCode">Item Code:</label>
            <input
              id="itemCode"
              type="text"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hsnCode">HSN Code:</label>
            <input
              id="hsnCode"
              type="text"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="make">Make:</label>
            <input
              id="make"
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit:</label>
            <input
              id="unit"
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pricePerUnit">Price/Unit:</label>
            <input
              id="pricePerUnit"
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn">Create Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;