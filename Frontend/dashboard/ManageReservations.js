var checkReservation = new Vue({
  el: "#checkreservation",
  data: {
    tableData: [],
  },
  mounted() {
    this.getReservationData();
  },
  updated() {},
  methods: {
    getReservationData: function () {
      axios
        .get("http://localhost:5000/reservation")
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.data;
          
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
  },
  beforeMount() {},
});
