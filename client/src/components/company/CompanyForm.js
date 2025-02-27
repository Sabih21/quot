// client/src/CompanyForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CompanyForm = ({ refreshData }) => {
    const [company_name, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('company_name', company_name);
        formData.append('description', description);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/companies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Company Created Successfully");
            window.location.href="/company";
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="form-title">Add New Company</h2>
                <form onSubmit={handleSubmit} className="company-form">
                    <div className="form-group">
                        <label htmlFor="company_name">Company Name:</label>
                        <input
                            id="company_name"
                            type="text"
                            value={company_name}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Signature Image:</label>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Add Company</button>
                </form>
            </div>
        </div>
    );
};

export default CompanyForm;
