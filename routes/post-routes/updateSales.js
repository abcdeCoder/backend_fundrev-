const express = require("express");
const router = express.Router();

const Startup = require('../../models/Startup');

router.post("/updateSales/:companyName", async function (req, res) {
  try {
    const name = req.params.companyName;
    const salesData = req.body;
    const startup = await Startup.findOne({ username: name });

    if (!startup) {
      return res.status(404).json({ success: false, message: "Startup not found" });
    }

    if (!startup.salesData || startup.salesData.length === 0) {
      startup.salesData = salesData;
    } else {
      salesData.forEach((newYearData) => {
        const existingYearData = startup.salesData.find((yearData) => yearData.year === newYearData.year);

        if (existingYearData) {
          existingYearData.sales = newYearData.sales;
        } else {
          startup.salesData.push(newYearData);
        }
      });
    }
    await startup.save();

    res.json({ success: true, message: "Startup updated successfully", startup });
  } catch (error) {
    console.error("Error updating startup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;

