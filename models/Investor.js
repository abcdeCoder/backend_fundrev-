const mongoose = require("mongoose");

const InvestorSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const Investor = mongoose.model("investors", InvestorSchema);
module.exports = Investor;
