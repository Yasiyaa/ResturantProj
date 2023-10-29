const express = require("express");
const router = express.Router();
const customerService = require("../Services/customerService");

router
  .route("/customer")

  // Get all customer
  .get(function (req, res) {
    const cService = customerService.getCustomerInstance();
    const result = cService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  // Create new customer
  .post(function (req, res) {
    const { name, address, telephone, email, password } = req.body;
    const cService = customerService.getCustomerInstance();

    const result = cService.insertNewCustomer(
      name,
      address,
      telephone,
      email,
      password
    );

    result
      .then((data) => res.json({ data: data }))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the customer." });
      });
  });

// Customer authenticate
router.route("/customer/authenticate").post(function (req, res) {
  const { email, password } = req.body;
  const cService = customerService.getCustomerInstance();

  const result = cService.authenticate(email, password);

  result.then((data) => res.send(data)).catch((err) => console.log(err));
});

// Customer delete
router.route("/customer/:id").delete(function (req, res) {
  const { id } = req.params;
  const cService = customerService.getCustomerInstance();

  const result = cService.deleteCustomerById(id);

  result
    .then((data) => {
      res.send(data);
    })

    .catch((err) => console.log(err));
});

module.exports = router;
