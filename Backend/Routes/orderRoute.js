const express = require("express");
const router = express.Router();
const orderService = require("../Services/orderService");
const orderItemService = require("../Services/orderItemsService");
const paymentService = require("../Services/paymentService");

router
  .route("/order")

  // Get all orders
  .get(function (req, res) {
    const oService = orderService.getOrderInstance();
    const oIService = orderItemService.getOrderItemsInstance();

    const result = oService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  // Create new order
  .post(function (req, res) {
    const { foodOrder, paymentData } = req.body;
    const oService = orderService.getOrderInstance();

    // food_order table
    let foodOrderObj = JSON.parse(foodOrder);
    let paymentObj = paymentData;

    const result = oService.insertNewOrder(
      foodOrderObj.customerID,
      foodOrderObj.date,
      foodOrderObj.total,
      foodOrderObj.isPaid,
      foodOrderObj.orderType,
      foodOrderObj.orderStatus
    );

    result
      .then((data) => {
        // payment insertion
        const payService = paymentService.getPaymentInstance();
        payService.insertNewPayment(
          foodOrderObj.customerID,
          data.insertId,
          paymentObj.amount,
          paymentObj.date
        );
        res.send("Order placed!");
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the customer." });
      });
  });

// update order status
router.route("/order").put(function (req, res) {
  const oService = orderService.getOrderInstance();
  const { id, orderStatus } = req.body;
  const result = oService.updateOrder(id, orderStatus);

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
