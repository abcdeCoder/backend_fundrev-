const express = require('express');
const router = express.Router();
const InvestorRequest = require('../../models/InvestorRequest');

router.post('/submitInterest', async (req, res) => {
  const { investorName, startupName, message } = req.body;

  try {
    const newRequest = await InvestorRequest.create({
      investorName, 
      startupName,
      message,
      status: 'pending',
    });

    res.json({ success: true, message: 'Interest request submitted successfully', request: newRequest });
  } catch (error) {
    console.error('Error submitting interest request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
module.exports = router;  


