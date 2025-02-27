// server/routes/companyRoutes.js
import express from 'express';
import Company from '../models/CompanyModel.js';  


import multer from 'multer';
import path from 'path';
const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Create a new company
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { company_name, description } = req.body;
        const image = req.file.filename;
        const newCompany = new Company({ company_name, description, image });
        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(400).json({ error: 'Error creating company' });
    }
});

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching companies' });
    }
});

// Get a single company
router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching company' });
    }
});

// Update a company
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { company_name, description } = req.body;
        const image = req.file ? req.file.filename : req.body.image;
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, { company_name, description, image }, { new: true });
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(400).json({ error: 'Error updating company' });
    }
});

// Delete a company
router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting company' });
    }
});

export default router;
