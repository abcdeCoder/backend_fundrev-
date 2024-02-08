const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const Startup = require('../../models/Startup');

router.post("/addstartup", async function (req, res) {
    const { username, password, businessDescription, revenue } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const startupResponse = new Startup({
            username,
            password: hashedPassword,
            businessDescription,
            revenue,
            salesData: [],
        });
        await startupResponse.save();

        res.json({ success: true, message: "Startup added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error adding startup" });
    }
});

module.exports = router;
