var login = new Vue({
  el: "#loginformStaff",
  data: {
    username: "",
    password: "",
  },
  mounted() {},
  updated() {},
  methods: {
    authenticate: function () {
      var credentials = { password: this.password, username: this.username };

      axios
        .post("http://localhost:5000/user/authenticate", credentials)
        .then((res) => {
          if (res.status == 200 && res.data.length > 0) {
            console.log(res);
            if (res.data[0].type == "admin") {
              window.location.href = "../ManageReservations.html";
            }else {
                window.location.href = "../orderTracking.html";
            }
          } else {
            alert("Incorrect email or password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
