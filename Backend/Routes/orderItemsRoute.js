const express = require("express");
const router = express.Router();
const orderItemsService = require("../Services/orderItemsService");

router
  .route("/order-items")

  // Get all customer
  .get(function (req, res) {
    const OIemsService = orderItemsService.getOrderItemsInstance();
    const result = OIemsService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  // add new order item
  .post(function (req, res) {
    const { oid, mid, qty } = req.body;
    const OIemsService = orderItemsService.getOrderItemsInstance();

    const result = OIemsService.insertNewOrderItems(oid, mid, qty);

    result
      .then((data) => res.json({ data: data }))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the customer." });
      });
  });


  module.exports = router;