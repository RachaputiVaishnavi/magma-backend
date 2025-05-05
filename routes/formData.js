const express = require('express');
const router = express.Router();
const upload = require('../utils/gridFsStorage');
const FormSubmission = require('../models/FormSubmission');

router.post('/', upload.single('supportingDocuments'), async (req, res) => {
  try {
    const {
      role, fullName, phoneNumber, emailAddress, country, city, startupName,
      websiteURL, currentState, lookingFor, companyLinkedIn, foundersLinkedIn,
      industry, problemSolved, startupDescription, targetMarket, numberOfCustomers,
      revenueCurrency, revenueAmount, raisedFunding, fundingCurrency, fundingAmount,
      heardFrom, additionalInfo
    } = req.body;

    const newForm = new FormSubmission({
      role,
      fullName,
      phoneNumber,
      emailAddress,
      country,
      city,
      startupName,
      websiteURL,
      currentState,
      lookingFor,
      companyLinkedIn,
      foundersLinkedIn,
      industry,
      problemSolved,
      startupDescription,
      targetMarket,
      numberOfCustomers,
      revenueCurrency,
      revenueAmount,
      raisedFunding: raisedFunding === 'true',
      fundingCurrency,
      fundingAmount,
      supportingDocuments: req.file ? req.file.id : null, // Store file ID from GridFS
      heardFrom,
      additionalInfo
    });

    await newForm.save();
    res.status(200).json({ message: 'Form submitted and file stored in DB!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});
