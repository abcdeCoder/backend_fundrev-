const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const Investor = require('../../models/Investor');

router.post("/checkinvestorpassword", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    try {
      const user = await Investor.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
  
        if (result) {
          const name = user.username;
          return res.json({ message: 'ok', username: name });
        } else {
          return res.json({ message: 'Incorrect password' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;  