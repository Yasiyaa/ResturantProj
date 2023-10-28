const express = require("express");
const router = express.Router();
const CIService = require("../Services/customerInQueries");

router
  .route("/inquiry")

  // Get all  inquiry
  .get(function (req, res) {
    const inquiryService = CIService.getCustomerInqueriesInstance();
    const result = inquiryService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  // Create new inquiry
  .post(function (req, res) {
    const { cusid, type, inquiry, status } = req.body;
    const inquiryService = CIService.getCustomerInqueriesInstance();

    const result = inquiryService.insertNewQuery(cusid, type, inquiry, status);

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

module.exports = router;
