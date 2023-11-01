var itemList = new Vue({
  el: "#itemListComponent",
  data: {
    itemList: [
      { name: "Grilled salmon", calories: 250, persons: 1, price: 2500 },
      { name: "Chinese dumplings", calories: 30, persons: 1, price: 870 },
      { name: "Black pudding", calories: 500, persons: 1, price: 900 },
      { name: "Fried rice", calories: 1500, persons: 2, price: 3850 },
    ],
    customerID: "",
  },
  mounted() {
    let currentUrl = window.location.href;
    this.customerID = currentUrl.split("=")[1];
    localStorage.setItem("customerID", this.customerID);
  },
  updated() {},
  methods: {
    authenticate: function () {
      let data = {};

      axios
        .post("http://localhost:5000/inquiry", data)
        .then((res) => {
          if (res.status == 200) {
            window.location.href = "./index.html";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
  },
});
