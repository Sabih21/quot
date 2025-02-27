import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const ClientDropdown = ({ clients, invoice, setClient }) => {
    const [options, setOptions] = useState(clients.map(client => ({ value: client.name, label: client.name })));

    const handleChange = (selectedOption) => {
        setClient(selectedOption ? { name: selectedOption.value } : null);
    };

    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setOptions([...options, newOption]);
        setClient({ name: inputValue });
    };

    return (
        <CreatableSelect
            isClearable
            options={options}
            onChange={handleChange}
            onCreateOption={handleCreate}
            placeholder="Select or add a customer..."
            value={options.find(option => option.value === clients?.name) || null}
            styles={{ container: (base) => ({ ...base, width: "100%" }) }}
        />
    );
};

export default ClientDropdown;
