import React, { Component } from 'react';
import CartItem from './CartItem';
import Loader from '../nav/loader/Loader';
import { Link } from 'react-router-dom';
import CartOrder from './CartOrder';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quantity: 0,
            cart: '',
            totalPrice: 0,
            deliveryPrice: 6,
            isLoaded: false,
            USDcurrency: 1.14295
         }
         this.getCartInfo = this.getCartInfo.bind(this);

    }
    componentDidMount() {
        this.getCurrency();
        setTimeout(() => {
        this.getCartInfo();
    }, 1500);    
    }

    getCartInfo(){
       
        let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        this.setState({
            cart: cart
        });
        let totalPrice = 0;
        let quantity = 0;
        if(cart) {
            for(let i = 0; i < Object.keys(cart).length; i++) {
                totalPrice += parseInt(Object.values(cart)[i]['price']) * Object.values(cart)[i]['quantity'];
                quantity += Object.values(cart)[i]['quantity'];
            }
        }
        this.setState({
            totalPrice: totalPrice,
            quantity: quantity,
            isLoaded: true
        });  
    }
    render() { 
        const cart = this.state.cart;
        const USD = (this.state.totalPrice * this.state.USDcurrency).toFixed(2);
        const totalPrice = (this.state.totalPrice).toFixed(2);
        let priceWithDelivery = this.state.totalPrice + this.state.deliveryPrice;
        let priceWithDeliveryUSD = (this.state.totalPrice + this.state.deliveryPrice) * this.state.USDcurrency;
        priceWithDeliveryUSD = (priceWithDeliveryUSD).toFixed(2);
        priceWithDelivery = priceWithDelivery.toFixed(2);
        return ( 
            <div className="mx-md-5">
                {this.state.isLoaded ?     
                <div className="text-left col-xl-12 row no-gutters py-4">
                    <hr />
                    {/* list */}
                    <div className="col-xl-8 col-lg-12 col-md-12 col-12 border-right bg-light">
                    <div className="row py-4 mx-2">
                        <div className="col-12">
                            <h2 className="text-left">Cart</h2>
                            <hr />
                        </div>
                       
                       { cart ? 
                        cart.map((item) => 
                        <div className="col-xl-12" onClick={this.getCartInfo} key={item.id}><CartItem  id={item.id} quantity={item.quantity} /></div>
                        
                        )  : <div className="mx-auto"><h5>Cart empty - <Link className="btn btn-danger" to="/">Order here</Link></h5></div> } 
                        </div>
                        
                     </div>
                     {/* checkout */}
                     <div className="col-xl-4 col-lg-12 col-md-12 bg-dark text-light">
                       
                         <CartOrder quantity={this.state.quantity} USD={USD} totalPrice={totalPrice} deliveryPrice={this.state.deliveryPrice} USDcurrency={this.state.USDcurrency}
                          priceWithDelivery={priceWithDelivery} priceWithDeliveryUSD={priceWithDeliveryUSD} />
                     </div>
                     <div>

                     </div>
                    <hr />
                </div>
                : <Loader /> }
            </div>
         );
    }
}
 
export default Cart;