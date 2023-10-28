const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const customerService = require("./Services/customer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post("/insert", (request, response) => {
  const { name, address, telephone, email, password } = request.body;
  const cService = customerService.getCustomerInstance();

  const result = cService.insertNewCustomer(
    name,
    address,
    telephone,
    email,
    password
  );

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => {
      console.log(err);
      response
        .status(500)
        .json({ error: "An error occurred while inserting the customer." });
    });
});

// read
app.get("/getAll", (request, response) => {
  const cService = customerService.getCustomerInstance();

  const result = cService.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// update
app.patch("/update", (request, response) => {
  const { id, name } = request.body;
  const cService = dbService.getDbServiceInstance();

  const result = cService.updateNameById(id, name);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// delete
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const cService = customerService.getCustomerInstance();

  const result = cService.deleteCustomerById(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});


// user authenticate
app.post("/authenticate", (request, response) => {
  const { email,password } = request.body;
  const cService = customerService.getCustomerInstance();

  const result = cService.authenticate(email,password);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log("app is running"));
