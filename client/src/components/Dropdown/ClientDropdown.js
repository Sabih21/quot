import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const ClientDropdown = ({ clients, invoice, setClient, onClientChange, setNewClient,onChangeClient }) => {
    const [options, setOptions] = useState([]);


    const [clientsD, setClientsD] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/clients")
        .then(response => {
            const options = response.data.data.map(pro => ({
                value: pro.name,
                label: pro.name,
            }));
            setOptions(options);
        })
        .catch(error => console.error("Error fetching products:", error));
    });

    const handleChange = (selectedOption) => {
        // debugger;
        const clientData = selectedOption ? { name: selectedOption.value } : null;
        setClient(clientData);
        onChangeClient(clientData);
        if (onClientChange) onClientChange(clientData);
    };

    return (
        <CreatableSelect
            isClearable
            options={options}
            onChange={handleChange}
            placeholder="Select or add a customer..."
            value={options.find(option => option.value === invoice?.client?.name) || null}
            styles={{ container: (base) => ({ ...base, width: "100%" }) }}
        />
    );
};

export default ClientDropdown;
