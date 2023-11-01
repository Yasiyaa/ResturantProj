const express = require("express");
const router = express.Router();
const userService = require("../Services/userService");

// user authenticate
router.route("/user/authenticate").post(function (req, res) {
  const { username, password } = req.body;
  const uService = userService.getUserInstance();

  const result = uService.authenticate(username, password);

  result.then((data) => res.send(data)).catch((err) => console.log(err));
});

module.exports = router;
