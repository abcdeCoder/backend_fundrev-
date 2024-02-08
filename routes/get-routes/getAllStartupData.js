const express = require('express');
const router = express.Router();
const Startup = require('../../models/Startup');


router.get('/allCompanies', async (req, res) => {
  try {
    const allCompanies = await Startup.find();
    res.json({ success: true, companies: allCompanies });
  } catch (error) {
    console.error('Error fetching all companies:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
