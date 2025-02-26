import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';

function UpdateTax() {
  const { id } = useParams();
//   const navigate = useNavigate();

  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/taxes/${id}`)
      .then(response => {
        const tax = response.data;
        setName(tax.name);
        setRate(tax.rate);
        setType(tax.type);
      })
      .catch(error => {
        console.error('There was an error fetching the tax!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTax = {
      name,
      rate: parseFloat(rate),
      type
    };

    axios.put(`http://localhost:5000/api/taxes/${id}`, updatedTax)
      .then(response => {
        alert(response.data.message);
        // navigate('/');
      })
      .catch(error => {
        console.error('There was an error updating the tax!', error);
      });
  };

  return (
    <div>
      <h2>Update Tax</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rate (%):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Tax</button>
      </form>
    </div>
  );
}

export default UpdateTax;
