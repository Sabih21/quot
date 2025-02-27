// client/src/CompanyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyList.css'; // Import the updated CSS file

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/companies');
            setCompanies(res.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div className="company-container">
            <h1 className="company-title">Company List</h1>
            <ul className="company-list">
                {companies.map((company) => (
                    <li className="company-item" key={company._id}>
                        <img
                            className="company-image"
                            src={`http://localhost:5000/uploads/${company.image}`}
                            alt={company.company_name}
                            width="100"
                        />
                        <div>
                            <h3 className="company-name">{company.company_name}</h3>
                            <p className="company-description">{company.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;
