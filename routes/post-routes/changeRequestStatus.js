const express = require("express");
const router = express.Router();

const InvestorRequest = require('../../models/InvestorRequest');

router.post('/changeRequestStatus', async (req, res) => {
    const { requestId, status } = req.body;
  
    try {
      const updatedRequest = await InvestorRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
  
      res.json(updatedRequest);
    } catch (error) {
      console.error('Error changing request status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;  
