var inquiry = new Vue({
  el: "#inquiryForm",
  data: {
    cusid: "",
    type: "",
    inquiry: "",
    status: "false",
  },
  mounted() {
    this.cusid = localStorage.getItem("customerID");
  },
  updated() {},
  methods: {
    submitQuiry: function () {
      var credentials = {
        cusid: this.cusid,
        type: this.type,
        inquiry: this.inquiry,
        status: this.status,
      };

      axios
        .post("http://localhost:5000/inquiry", credentials)
        .then((res) => {
          if (res.status == 200) {
            alert("Inquiry submitted ");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("error occured");
        });
    },
  },
});
