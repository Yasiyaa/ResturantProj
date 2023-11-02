var payment = new Vue({
  el: "#paymentComponent",
  data: {
    cusid: "",
  },
  mounted() {
    this.cusid = localStorage.getItem("customerID");
  },
  updated() {},
  methods: {
    authenticate: function () {
      axios
        .post("http://localhost:5000")
        .then((res) => {
          if (res.status == 200) {
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
    payNow: function () {
      let orderItems = localStorage.getItem("orderItem");
      let foodOrder = localStorage.getItem("foodOrder");
      let paymentData = {
        cusID: this.cusid,
        amount: foodOrder.total,
        date: new Date()
      };
      let orderDetails = {
        orderItems,
        foodOrder,
        paymentData
      }

      axios
        .post("http://localhost:5000/order",orderDetails)
        .then((res) => {
          if (res.status == 200) {

          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
  },
});
