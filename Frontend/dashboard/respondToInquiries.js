var respondToInquiries = new Vue({
  el: "#respondToinquiries",
  data: {
    inquiryData: [],
  },
  mounted() {
    this.getInquiries();
  },
  updated() {},
  methods: {
    getInquiries: function () {
      axios
        .get("http://localhost:5000/inquiry")
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.inquiryData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Incorrect email or password");
        });
    },
  },
});
