const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const Startup = require('../../models/Startup');

router.post("/checkstartuppassword", async (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
    try {
      
      const user = await Startup.findOne({ username });
  
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
          const businessDescription = user.businessDescription
          const revenue = user.revenue
          return res.json({ message: 'ok', username: name, businessDescription:businessDescription, revenue:revenue });
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