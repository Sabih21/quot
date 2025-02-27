import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

const TaxDropdown = ({ index, itemField, handleChange }) => {
    const [taxOptions, setTaxOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [taxAmount, setTaxAmount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/taxes")
            .then(response => {
                const options = response.data.map(tax => ({
                    value: tax.rate,
                    label: `${tax.name} (${tax.rate}%)`
                }));
                setTaxOptions(options);
            })
            .catch(error => console.error("Error fetching taxes:", error));
    }, []);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);

        const taxRate = selectedOption ? selectedOption.value : 0;
        const unitPrice = parseFloat(itemField.unitPrice) || 0;
        const quantity = parseFloat(itemField.quantity) || 0;

        const subtotal = unitPrice * quantity;
        const calculatedTax = (subtotal * taxRate) / 100;
        const newAmount = subtotal + calculatedTax;

        setTaxAmount(calculatedTax);

        // Update the row's tax and final amount
        handleChange(index, { target: { name: "tax", value: taxRate } });
        console.log("Tax" + calculatedTax);
        handleChange(index, { target: { name: "taxAmo", value: calculatedTax } });

        handleChange(index, { target: { name: "amount", value: newAmount } });



    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Select
                options={taxOptions}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Select Tax"
                styles={{
                    container: (base) => ({ ...base, width: "100%" }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                menuPortalTarget={document.body}
                isClearable
                name="tax"
            />
            <TextField
                sx={{ ml: 1, flex: 1, width: "100px" }}
                type="number"
                value={taxAmount}
                placeholder="Tax Applied"
                disabled
                name="taxAmo"
            />
        </div>
    );
};

export default TaxDropdown;
