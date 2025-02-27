// client/src/CompanyDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@material-ui/core';

const SignatureCompany = ({ companyId }) => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/companies/${companyId}`);
                setCompany(res.data);
            } catch (error) {
                setError('Error fetching company details');
            } finally {
                setLoading(false);
            }
        };
        
        if (companyId) {
            fetchCompany();
        }
    }, [companyId]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!company) return null;

    return (
        <Container  style={{ textAlign: 'right' }}>
            <Typography variant="h6">From: {company.company_name}</Typography>
            <a href={`http://localhost:5000/uploads/${company.image}`} target="_blank" rel="noopener noreferrer">
                <img 
                    src={`http://localhost:5000/uploads/${company.image}`} 
                    alt={company.company_name} 
                    width="200" 
                />
            </a>
            
            <Typography variant="body2"><b>Authorized Signatory</b></Typography>
        </Container>
    );
};

export default SignatureCompany;