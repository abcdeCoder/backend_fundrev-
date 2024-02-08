const mongoose = require("mongoose");

const StartupSchema = new mongoose.Schema({
  username: String,
  password: String,
  businessDescription: String, 
  revenue: String,
  salesData: [
    {
      year: Number,
      sales: [Number],
    },
  ],
  });
const Startup = mongoose.model("startups", StartupSchema);
module.exports = Startup  