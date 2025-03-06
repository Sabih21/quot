
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const ProductDropdown = ({ index, itemField, handleChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => {
                const options = response.data.map(pro => ({
                    value: pro._id,
                    label: pro.item, // Simple label for display when selected
                    fullLabel: ( // Detailed label for dropdown options
                        <div>
                            <span style={{ fontSize: '12px', fontWeight: 500 }}>{pro.item}</span>
                            <div style={{ fontSize: '10px', color: '#666', marginLeft: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div>Price: ₹{pro.pricePerUnit}</div>
                                <div>HSN: {pro.hsnCode}</div>
                                <div>Code: {pro.itemCode}</div>
                            </div>
                        </div>
                    ),
                    itemCode: pro.itemCode,
                    hsnCode: pro.hsnCode,
                    price: pro.pricePerUnit,
                    unit: pro.unit,
                    make: pro.make,
                    pname: pro.item
                }));
                setProducts(options);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const handleSelectChange = (selectedOption) => {

        if (typeof selectedOption === "string") {
            selectedOption = { value: selectedOption, label: selectedOption, pname: selectedOption};
        }

        setSelectedOption(selectedOption);
        
        if (selectedOption) {
            handleChange(index, { target: { name: "itemCode", value: selectedOption.itemCode } });
            
            handleChange(index, { target: { name: "itemName", value: selectedOption.pname } });

            

            
            handleChange(index, { target: { name: "itemHsnCode", value: selectedOption.hsnCode } });
            if(itemField.taxAmo == undefined){
                handleChange(index, { target: { name: "taxAmo", value: 0 } }); 
            }
            if(itemField.quantity == ""){
                handleChange(index, { target: { name: "quantity", value: 1 } });
            }
            handleChange(index, { target: { name: "unitPrice", value: selectedOption.price } });
            handleChange(index, { target: { name: "itemUnit", value: selectedOption.unit } });
            handleChange(index, { target: { name: "itemMake", value: selectedOption.make } });
        }
    };

    // Custom format for dropdown options
    const formatOptionLabel = ({ fullLabel, label }) => (
        <div>{fullLabel || label}</div>
    );

    return (
        <CreatableSelect
            isClearable
            options={products}
            value={selectedOption ? { 
                value: selectedOption.value, 
                label: selectedOption.pname 
            } : null}
            onChange={handleSelectChange}
            onCreateOption={handleSelectChange}
            formatOptionLabel={formatOptionLabel}
            placeholder="Select or add a Item..."
            styles={{
                container: (base) => ({ ...base, width: "100%" }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                singleValue: (provided) => ({
                    ...provided,
                    fontSize: '12px',
                    fontWeight: 500
                })
            }}
            name="itemName"
            menuPortalTarget={document.body}
        />
    );
};

export default ProductDropdown;