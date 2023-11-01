var login = new Vue({
  el: "#loginform",
  data: {
    email: "",
    password: "",
  },
  mounted() {},
  updated() {},
  methods: {
    authenticate: function () {
      var credentials = { email: this.email, password: this.password };

      // Validation flags
      var valid = true;

      if (this.email.trim() === "") {
        alert("Email is required");
        valid = false;
      } 

      if (this.password.trim() === "") {
        alert("Password is required");
        valid = false;
      }

      if (valid) {
      
          axios
            .post("http://localhost:5000/customer/authenticate", credentials)
            .then((res) => {
              if (res.status == 200) {
           
                window.location.href = "../index.html?customerID="+res.data[0].customerID;
              }
            })
            .catch((err) => {
              console.log(err);
              alert("Incorrect email or password");
            });
      }

    },
  },
});
