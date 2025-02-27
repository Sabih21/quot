import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  item: { type: String, required: true },
  itemCode: { type: String, required: true, unique: true },
  hsnCode: { type: String, required: true },
  make: { type: String, required: true },
  unit: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
});

// module.exports = mongoose.model('Product', productSchema);
const Product = mongoose.model('Product',productSchema)
// const Profile = mongoose.model('Profile', profileSchema)

export default Product;
