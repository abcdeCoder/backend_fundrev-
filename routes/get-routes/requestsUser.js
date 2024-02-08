const express = require('express');
const router = express.Router();
const InvestorRequest = require('../../models/InvestorRequest');

router.get('/requests/:userName', async (req, res) => {
  const { userName } = req.params;
  try {
    const allRequests = await InvestorRequest.find({
        investorName : userName
    });
    res.json({ success: true, requests: allRequests });
  } catch (error) {
    console.error('Error fetching all companies:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
