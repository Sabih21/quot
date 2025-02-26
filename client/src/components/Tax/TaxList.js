import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './addtax.css'; // Custom CSS for TaxList

function TaxList() {
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/taxes')
      .then(response => {
        setTaxes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching taxes!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/taxes/${id}`)
      .then(response => {
        setTaxes(taxes.filter(tax => tax._id !== id));
        alert(response.data.message);
      })
      .catch(error => {
        console.error('There was an error deleting the tax!', error);
      });
  };

  return (
    <div className="tax-list-container">
      <h2 className="tax-list-title">Tax List</h2>
      <Link to="/add" className="add-button">
        <button>Add New Tax</button>
      </Link>
      <ul className="tax-list">
        {taxes.map(tax => (
          <li key={tax._id} className="tax-item">
            <span>{tax.name} - {tax.type} - {tax.rate}%</span>
            <Link to={`/update/${tax._id}`} className="update-link">
              <button className="update-button">Update</button>
            </Link>
            <button 
              className="delete-button" 
              onClick={() => handleDelete(tax._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaxList;
