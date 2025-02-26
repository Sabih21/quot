import express from 'express';
import mongoose from 'mongoose';

// Define the Tax schema
const TaxSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    rate: {
        type: Number, 
        required: true, 
    },
    type: {
        type: String, 
        required: true, 
    },
});

// Create the Tax model based on the schema
const TaxModel = mongoose.model('Tax', TaxSchema);

// Export the model
export default TaxModel;
