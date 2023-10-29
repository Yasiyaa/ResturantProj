const express = require("express");
const router = express.Router();
const menuService = require("../Services/menuService");


router
  .route("/menu")

  // Get all menu 
  .get(function (req, res) {
    const mService = menuService.getMenuInstance();
    const result = mService.getAllData();
    result.then((data) => res.send(data)).catch((err) => console.log(err));

    // res.send(data);
  })


  module.exports = router;