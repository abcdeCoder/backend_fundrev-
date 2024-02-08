const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const Investor = require('../../models/Investor');

router.post("/addinvestor", async function (req, res) {
    const { username, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const investorResponse = new Investor({
            username,
            password: hashedPassword,
        });

        await investorResponse.save();

        res.json({ success: true, message: "Investor added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error adding Investor" });
    }
});

module.exports = router;
