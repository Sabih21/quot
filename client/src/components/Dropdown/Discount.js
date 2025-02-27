import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';

const Discount = ({ index, itemField, handleChange }) => {
    const [discountPercent, setDiscountPercent] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");

    useEffect(() => {
        if (discountPercent !== "") {
            const calculatedAmount = (itemField.unitPrice * itemField.quantity * discountPercent) / 100;
            setDiscountAmount(calculatedAmount);
            handleChange(index, { target: { name: "discount", value: discountPercent } });
        } else if (discountAmount !== "") {
            const calculatedPercent = (discountAmount / (itemField.unitPrice * itemField.quantity)) * 100;
            setDiscountPercent(calculatedPercent);
            handleChange(index, { target: { name: "discount", value: calculatedPercent } });
        }
    }, [discountPercent, discountAmount, itemField.unitPrice, itemField.quantity]);

    const handlePercentChange = (e) => {
        let value = e.target.value;

        handleChange(index, { target: { name: "discountPer", value: value } });
        handleChange(index, { target: { name: "discountAmo", value: (itemField.unitPrice * itemField.quantity * value) / 100 } });


        setDiscountPercent(value);
        setDiscountAmount((itemField.unitPrice * itemField.quantity * value) / 100);

    };

    const handleAmountChange = (e) => {
        let value = e.target.value;

        
        handleChange(index, { target: { name: "discountAmo", value: value } });
        handleChange(index, { target: { name: "discountPer", value: (itemField.unitPrice * itemField.quantity * value) / 100 } });


        setDiscountAmount(value);
        setDiscountPercent((value / (itemField.unitPrice * itemField.quantity)) * 100);
    };

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <TextField
                type="number"
                label="%"
                variant="outlined"
                size="small"
                value={discountPercent}
                onChange={handlePercentChange}
                placeholder="%"
                name="discountPer"
            />
            <TextField
                type="number"
                label="Amount"
                variant="outlined"
                size="small"
                value={discountAmount}
                onChange={handleAmountChange}
                placeholder="Amount"
                name="discountAmo"

            />
        </div>
    );
};

export default Discount;
