var itemList = new Vue({
  el: "#itemListComponent",
  data: {
    itemList: [],
    cart:[],
    cartTotal:0
  },
  mounted() {
    this.getFoodItems();
  },
  updated() {},
  methods: {
    getFoodItems: function () {
      axios
        .get("http://localhost:5000/menu")
        .then((res) => {
          if (res.status == 200) {
            this.itemList = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart: function(item){
        this.cart.push(item);
        this.cartTotal = this.cartTotal + item.unitprice;
    },
    removeItem: function(cartItem){
        this.cart.splice(this.cart.indexOf(cartItem),1);
        this.cartTotal = this.cartTotal - cartItem.unitprice;
    },
    checkOut: function(){
        
    }
  },
});

  
