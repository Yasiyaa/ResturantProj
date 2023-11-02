var payment = new Vue({
  el: "#paymentComponent",
  data: {
    cusid: "",
  },
  mounted() {
  },
  updated() {},
  methods: {
   
    payNow: function () {
      let orderItems = localStorage.getItem("orderItems");
      let foodOrder = localStorage.getItem("foodOrder");
      let paymentData = {
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
            alert("Order placed successfull")

          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
  },
});
