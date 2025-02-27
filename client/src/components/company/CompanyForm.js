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
            refreshData(); // Refresh the company list
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Company Name"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <button type="submit">Add Company</button>
        </form>
    );
};

export default CompanyForm;
