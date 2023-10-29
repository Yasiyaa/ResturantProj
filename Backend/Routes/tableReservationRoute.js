const express = require("express");
const router = express.Router();
const tableReservationService = require("../Services/tableReservationService");

router
  .route("/reservation")

  .get(function (req, res) {
    const TRservice = tableReservationService.getTableReservationInstance();
    const result = TRservice.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));
  })

  .post(function (req, res) {
    const { name, date, time, noOfPeople, email } = req.body;
    const TRservice = tableReservationService.getTableReservationInstance();
    const result = TRservice.insertNewReservation(
      name,
      date,
      time,
      noOfPeople,
      email
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

router.route("/reservation").put(function (req, res) {
  const { reservationId, tableno, date, time, noOfPeople } = req.body;
  const TRservice = tableReservationService.getTableReservationInstance();

  TRservice.updateReservationById(
    reservationId,
    tableno,
    date,
    time,
    noOfPeople
  )
    .then((data) => {
      if (data) {
        res.json({ data: data });
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the reservation." });
    });
});

module.exports = router;
