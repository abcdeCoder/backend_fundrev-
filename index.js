const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const getStartupData = require('./routes/get-routes/getStartupData')
app.use(getStartupData)
const getAllStartupsData = require('./routes/get-routes/getAllStartupData')
app.use(getAllStartupsData)
const incomingRequests = require('./routes/get-routes/incomingRequests')
app.use(incomingRequests)
const requestsUser = require('./routes/get-routes/requestsUser')
app.use(requestsUser)


const addInvestor = require('./routes/post-routes/addInvestor')
app.use(addInvestor)
const addStartup = require('./routes/post-routes/addStartup')
app.use(addStartup)
const updateSales = require('./routes/post-routes/updateSales')
pp.use(updateSales)
const checkInvestorPassword = require('./routes/post-routes/checkInvestorpassword')
app.use(checkInvestorPassword)
const checkStartUpPassword = require('./routes/post-routes/checkStartupPassword')
pp.use(checkStartUpPassword)
const submitInterest = require('./routes/post-routes/submitInterest')
app.use(submitInterest)
const changeRequestStatus = require('./routes/post-routes/changeRequestStatus')
app.use(changeRequestStatus)

mongoose
.connect("mongodb+srv://vermamonu185:vSfbM9MlQRz7t3WM@cluster0.hxy6rqm.mongodb.net/", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "Fundrev",
})
.then(() => {
  console.log("Database connected📶");
})
.catch((error) => {
  console.log(error);
});


//Running on the port
const port = process.env.port||5000;
app.listen(port, () => {
  console.log(`Server is running on port🚀 ${port}`);
});
