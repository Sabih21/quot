import express from 'express';
import TaxModel from '../models/TaxModel.js';

const router = express.Router();

// CREATE new tax
// router.post('/', async (req, res) => {
//   const { name, rate, type } = req.body;

//   const newTax = new TaxModel({ name, rate, type });

//   try {
//     await newTax.save();
//     res.status(201).json({ message: 'Tax created successfully!', tax: newTax });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating tax', error });
//   }
// });

// READ all taxes
router.get('/', async (req, res) => {
  try {
    const taxes = await TaxModel.find();
    res.status(200).json(taxes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching taxes', error });
  }
});

// UPDATE a tax by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rate, type } = req.body;

  try {
    const updatedTax = await TaxModel.findByIdAndUpdate(id, { name, rate, type }, { new: true });
    res.status(200).json({ message: 'Tax updated successfully!', tax: updatedTax });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tax', error });
  }
});

// DELETE a tax by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await TaxModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tax deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tax', error });
  }
});

export default router;
