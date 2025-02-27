// server/models/Company.js
import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Company = mongoose.model('Company',companySchema)

// module.exports = mongoose.model('Company', companySchema);
export default Company;
