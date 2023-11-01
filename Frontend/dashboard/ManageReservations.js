var checkReservation = new Vue({
  el: "#checkreservation",
  data: {
    tableData: [],
    resid:''
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

    deleteReservation: function(id){
      
      axios
        .delete("http://localhost:5000/reservations/"+id)
        .then((res) => {
          if (res.status == 200) {
            
            alert(id)
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    }
  },
  beforeMount() {},
});
