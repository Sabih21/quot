
//Copyright (c) 2022 Panshak Solomon

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import pdf from 'html-pdf'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import invoiceRoutes from './routes/invoices.js'
import clientRoutes from './routes/clients.js'
import userRoutes from './routes/userRoutes.js'
import InvoiceModel from './models/InvoiceModel.js'

import profile from './routes/profile.js'
import pdfTemplate from './documents/index.js'
import pdfsecondTemplate from './documents/secondindex.js'
// pdfthirdTemplate
import pdfthirdTemplate from './documents/thirdindex.js'
// In your main file
import  productRoutes  from './routes/productRoutes.js';

// import invoiceTemplate from './documents/invoice.js'
import emailTemplate from './documents/email.js'
import TaxModel from './models/TaxModel.js';

import companyRoutes from  './routes/companyRoutes.js';

import path from 'path';

const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true})))
app.use((express.urlencoded({ limit: "30mb", extended: true})))


app.use((cors()))

app.use('/invoices', invoiceRoutes)
app.use('/clients', clientRoutes)
app.use('/users', userRoutes)
app.use('/profiles', profile)

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})

// app.get('/pdf', (req, res) => {
//     const { email, company } = req.body

// });
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


    var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    const { email, company } = req.body

    // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
       
          // send mail with defined transport object
        transporter.sendMail({
            from: ` Accountill <hello@accountill.com>`, // sender address
            to: `${email}`, // list of receivers
            replyTo: `${company.email}`,
            subject: `Invoice from ${company.businessName ? company.businessName : company.name}`, // Subject line
            text: `Invoice from ${company.businessName ? company.businessName : company.name }`, // plain text body
            html: emailTemplate(req.body), // html body
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname}/invoice.pdf`
            }]
        });

        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});


app.post('/taxes', async (req, res) => {
  const { name, rate, type } = req.body;

  const newTax = new TaxModel({ name, rate, type });

  try {
    await newTax.save();
    res.status(201).json({ message: 'Tax created successfully!', tax: newTax });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tax', error });
  }

});


//Problems downloading and sending invoice
// npm install html-pdf -g
// npm link html-pdf
// npm link phantomjs-prebuilt

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Invoice ID is required' });

      // Fetch invoice data
      const invoice = await InvoiceModel.findById(id).populate("selectedCompany.value");
      if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

      // Generate PDF with fetched invoice data
      pdf.create(pdfTemplate(invoice), {}).toFile('invoice.pdf', (err) => {
          if (err) {
              console.error('PDF generation error:', err); // Log error for debugging
              return res.status(500).json({ error: 'PDF generation failed' });
          }
          res.status(200).json({ message: 'PDF Created' });
      });

  } catch (error) {
      console.error('Server error:', error); // Log error for debugging
      res.status(500).json({ error: 'Server Error', details: error.message });
  }
});

app.get('/preview-invoice', async (req, res) => {
  try {
      const id = "67c0d291f160cb2578bfb423";
      if (!id) return res.status(400).send('Invoice ID is required');

      // Fetch invoice data
      const invoice = await InvoiceModel.findById(id).populate("selectedCompany.value");
      if (!invoice) return res.status(404).send('Invoice not found');

      // Generate the invoice HTML
      const invoiceHtml = pdfTemplate(invoice);

      // Send the HTML as a response
      res.send(invoiceHtml);

  } catch (error) {
      console.error('Server error:', error);
      res.status(500).send('Server Error');
  }
});



//second pdf

app.post('/create-secondpdf', (req, res) => {
  console.log('Received request:', req.body); // Log the incoming request
  pdf.create(pdfsecondTemplate(req.body), {}).toFile('secondinvoice.pdf', (err) => {
    if (err) {
      return res.status(500).send("Error creating PDF");
    }
    res.status(200).send("PDF created successfully");
  });
});



//SEND PDF INVOICE
app.get('/fetch-secondpdf', (req, res) => {
  res.sendFile(`${__dirname}/secondinvoice.pdf`)
})

//thirdPDF

app.post('/create-thirdpdf', (req, res) => {
  console.log('Received request:', req.body); // Log the incoming request
  pdf.create(pdfthirdTemplate(req.body), {}).toFile('thirdinvoice.pdf', (err) => {
    if (err) {
      return res.status(500).send("Error creating PDF");
    }
    res.status(200).send("PDF created successfully");
  });
});

app.get('/fetch-thirdpdf', (req, res) => {
  res.sendFile(`${__dirname}/thirdinvoice.pdf`)
})



//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
     res.sendFile(`${__dirname}/invoice.pdf`)
})


app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
  })

  


  app.get("/invoices", async (req, res) => {
    try {
      const InvoiceModel = await InvoiceModel.find();
      // console.log(users);
      // return "";
      res.json(InvoiceModel);
    } catch (error) {
      res.status(500).json({ message: "Error fetching InvoiceModel" });
    }
  });

  app.get('/api/taxes', async(req ,res) =>{
    try{
    const newTax = await TaxModel.find();
    res.json(newTax);

    }catch(error){
      console.error('Error fetching tax:', error); // Log the actual error
      res.status(500).json({ message: 'Error fetching tax data', error: error.message });
    }
  });

  app.use('/api', productRoutes);
  app.post('/api/taxes', async (req, res) => {
    const { name, rate, type } = req.body;
    
    const newTax = new TaxModel({ name, rate, type });
  
    try {
      await newTax.save();
      res.status(201).json({ message: 'Tax created successfully!', tax: newTax });
    } catch (error) {
      res.status(500).json({ message: 'Error creating tax', error });
    }
  
  });


  app.use('/api/companies', companyRoutes);


const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

