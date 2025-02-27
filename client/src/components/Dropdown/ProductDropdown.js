import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const ProductDropdown = ({ index, itemField, handleChange }) => {
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => {
                // debugger;
                const options = response.data.map(pro => ({
                    value: pro._id,
                    label: `${pro.item} - (₹ ${pro.pricePerUnit})`,
                    itemCode: pro.itemCode,
                    hsnCode: pro.hsnCode,
                    price: pro.pricePerUnit,
                    unit: pro.unit,
                    make: pro.make,
                    pname: pro.item
                }));

                setProducts(options);
            })
            .catch(error => console.error("Error fetching taxes:", error));
    }, []);

    const handleSelectChange = (selectedOption) => {
        
        setSelectedOption(selectedOption);

        // // Calculate new amount with discount
        // const newAmount = (unitPrice * quantity) - (unitPrice * quantity * discount / 100);

        // // Update the row's discount and amount
        // handleChange(index, { target: { name: "discount", value: discount } });
        // handleChange(index, { target: { name: "amount", value: newAmount } });
        
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

    return (
        <CreatableSelect
            isClearable
            options={products}
            onChange={handleSelectChange}
            placeholder="Select or add a Item..."
            styles={{
                container: (base) => ({ ...base, width: "100%" }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            name="itemName"
            menuPortalTarget={document.body}
        />
    );
};

export default ProductDropdown;
