import React, { useState } from 'react';
import axios from 'axios';
import './addtax.css'; // Custom CSS for styling

function AddTax() {
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTax = {
      name,
      rate: parseFloat(rate),
      type,
    };

    axios
      .post('http://localhost:5000/api/taxes', newTax)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('There was an error creating the tax!', error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Add New Tax</h2>
        <form onSubmit={handleSubmit} className="tax-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate">Rate (%):</label>
            <input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn">Create Tax</button>
        </form>
      </div>
    </div>
  );
}

export default AddTax;
