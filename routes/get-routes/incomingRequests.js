const express = require('express');
const router = express.Router();
const InvestorRequest = require('../../models/InvestorRequest');

router.get('/incomingRequests/:startupName', async (req, res) => {
  const { startupName } = req.params;

  try {
    const requests = await InvestorRequest.find({
      startupName: startupName
    });

    res.json({ requests });
  } catch (error) {
    console.error('Error fetching incoming requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;  

