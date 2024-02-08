const express = require("express");
const router = express.Router();

const Startup = require('../../models/Startup');

router.get("/startup/:companyName", async function (req, res) {
  try {
    const companyName = req.params.companyName;
    const startup = await Startup.findOne({ username: companyName });
 
    if (!startup) {
      return res.status(404).json({ success: false, message: "Startup not found" });
    }
    res.json({ success: true, startup });
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
