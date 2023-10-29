var booking = new Vue({
  el: "#bookingForm",
  data: {
    name: "",
    date: "",
    time: "",
    noOfPeople: 0,
    email: "",
  },
  mounted() {},
  updated() {},
  methods: {
    bookTable: function () {
      var data = { 
        name: this.name, 
        email: this.email, 
        date: this.date, 
        time: this.time, 
        noOfPeople: this.noOfPeople, 
    
    };
      axios
        .post("http://localhost:5000/reservation", data)
        .then((res) => {
          if (res.status == 200) {
           alert("Successfully booked! Your table No is: "+ res.data.data.tableNo)
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
  },
});
