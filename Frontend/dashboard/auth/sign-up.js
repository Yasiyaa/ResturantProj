var signup = new Vue({
  el: "#signupForm",
  data: {
    firstname: "",
    lastname: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    checkbox:""
  },
  mounted() {},
  updated() {},
  methods: {
    register: function () {
      var credentials = {
        name: this.firstname + " " + this.lastname,
        address: this.address,
        telephone: this.contact,
        email: this.email,
        password: this.password,
      };

      // validation

      let valid = true;


      if (this.firstname.trim() === "") {
        alert("First Name is required");
        valid = false;
      }

      if (this.lastname.trim() === "") {
        alert("Last Name is required");
        valid = false;
      }

      if (this.address.trim() === "") {
        alert("Address is required");
        valid = false;
      }

      if (this.contact.trim() === "") {
        alert("Phone No. is required");
        valid = false;
      }

      if (this.email.trim() === "") {
        alert("Email is required");
        valid = false;
      } 
      if (this.password.trim() === "") {
        alert("Password is required");
        valid = false;
      }

      if (!this.checkbox) {
        alert("Please agree to the terms of use");
        valid = false;
      }

      if (valid) {
        axios
          .post("http://localhost:5000/customer/", credentials)
          .then((res) => {
            if (res.status == 200) {
              alert("User added!");
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
