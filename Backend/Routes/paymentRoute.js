const express = require("express");
const router = express.Router();
const paymentService = require("../Services/paymentService");

router
  .route("/payment")

  // Get all payments
  .get(function (req, res) {
    const payService = paymentService.getPaymentInstance();
    const result = payService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  // add new payment
  .post(function (req, res) {
    const { cusid, oid, amount, date } = req.body;
    const payService = paymentService.getPaymentInstance();

    const result = payService.insertNewPayment(cusid, oid, amount, date);

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
