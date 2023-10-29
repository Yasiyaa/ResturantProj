const express = require("express");
const router = express.Router();
const orderService = require("../Services/orderService");

router
  .route("/order")

  // Get all orders
  .get(function (req, res) {
    const oService = orderService.getOrderInstance();
    const result = oService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  // Create new order
  .post(function (req, res) {
    const { cusid, date, total, ispaid, orderType, orderStatus } = req.body;
    const oService = orderService.getOrderInstance();

    const result = oService.insertNewOrder(
      cusid,
      date,
      total,
      ispaid,
      orderType,
      orderStatus
    );

    result
      .then((data) => res.json({ data: data }))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the customer." });
      });
  })

  // update order status
  .put(function(req,res){
    const oService = orderService.getOrderInstance();
    const { id ,orderStatus} = req.body;
    const result = oService.updateOrder(id,orderStatus);

    result
      .then((data) => res.json({ data: data }))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the customer." });
      });
  })




  module.exports = router;