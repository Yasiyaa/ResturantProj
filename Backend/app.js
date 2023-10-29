const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

// importing routes
const customer = require("./Routes/customerRoute");
const inquiry = require("./Routes/customerInQueriesRoute");
const tblRervation = require("./Routes/tableReservationRoute");
const table = require("./Routes/tableRoute");
const order = require("./Routes/orderRoute");
const orderItem = require("./Routes/orderItemsRoute");
const menu = require("./Routes/menuRoute");
const payment = require("./Routes/paymentRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route bind
app.use("/", customer);
app.use("/", inquiry);
app.use("/", tblRervation);
app.use("/", table);
app.use("/", order);
app.use("/", orderItem);
app.use("/", menu);
app.use("/", payment);


app.listen(process.env.PORT, () => console.log("app is running"));
