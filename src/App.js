import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './nav/Navbar';
import FoodMenu from './components/FoodMenu';
import Cart from './components/Cart';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
// import Orders from './components/Orders';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      cartQuantity: 0,
      storageLength: 0
     }
}


  componentDidMount() {
    this.checkLoginStatus();
    this.checkCartQuantity();
  }
 
  // componentDidUpdate() {
  //   if(Object.keys(JSON.parse(localStorage.getItem('cart'))).length !== this.state.storageLength)
  //     this.checkCartQuantity();
  // }
  checkCartQuantity() {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    let cartQuantity = 0;
    let storageLength = 0;
    if(cart)
    storageLength = Object.keys(cart).length;
    this.setState({
      storageLength: storageLength
    });
    if(cart)
    for(let i = 0; i < Object.keys(cart).length; i++){
      cartQuantity += Object.values(cart)[i]['quantity'];
  }
  this.setState({
    cartQuantity: cartQuantity
  });
}

 async checkLoginStatus(){
   let token = localStorage.getItem('id');
   if(token){
    const settings = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

      },
  };
  try {
      const fetchResponse = await fetch(`http://127.0.0.1:8000/api/auth/user/`, settings);
      const data = await fetchResponse.json();
      if(fetchResponse.status === 401){
          this.setState({
              registration_errors: data.errors[0].msg,
              username: ''
            });
          localStorage.removeItem("id");
          localStorage.removeItem("OrderID");
      }
          else if(fetchResponse.status === 200){
              this.setState({
                  registration_errors: '',
                  username: data['name'],
              });
              localStorage.setItem('OrderID', data['id']);   
          }
      return data;
} catch (e) {
  localStorage.removeItem("OrderID");
  localStorage.removeItem("id");
    return e;
  }
  }
}
  render() { 

    return ( 
      <div className="App">
     <Router>
       <Navbar path="/" username={this.state.username} quantity={this.state.cartQuantity} />
       <Switch>
          <Route exact path="/" component={FoodMenu} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/orders" component={Orders} /> */}
       </Switch>
     </Router>
    </div>
     );
  }
}
export default App;
