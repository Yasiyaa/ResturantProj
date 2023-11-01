var payment = new Vue({
  el: "#payment",
  data: {
    cusid:"",
   
  },
  mounted() {},
  updated() {
    this.cusid = localStorage.getItem("customerID");
  },
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


    placeOrder: function(){


    },
  },
});
