const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();

const customerService = require("./Services/customerService");

// importing routes
const  customer = require('./Routes/customerRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// route bind
app.use('/',customer); 


app.listen(process.env.PORT, () => console.log("app is running"));