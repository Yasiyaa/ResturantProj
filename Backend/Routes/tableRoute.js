const express = require("express");
const router = express.Router();
const TableService = require("../Services/tableDetailsService");

router
  .route("/table")

  // Get all customer
  .get(function (req, res) {
    const tableService = TableService.getTableInstance();
    const result = tableService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })

  .post(function (req, res) {
    const { seating, slots } = req.body;
    const tableService = TableService.getTableInstance();

    const result = tableService.insertNewTable( seating, slots);
    result
      .then((data) => res.json({ data: data }))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the table." });
      });
  });

module.exports = router;
