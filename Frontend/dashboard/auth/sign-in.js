var login = new Vue({
    el: "#loginform",
    data: {
        email: '',
        password: ''
    },
    mounted() {
        
    },
    updated() {
        
    },
    methods:{
  
        authenticate: function(){
  
        var credentials  = { email: this.email, password: this.password};
  
        axios.post('http://localhost:5000/customer/authenticate',credentials)
        .then((res) => {
            
            if(res.status == 200){
                window.location.href = '../index.html'
                
            }
  
        })
        .catch((err)=>{
            console.log(err)
            alert('Incorrect email or password');
        });
        }
    }
  })