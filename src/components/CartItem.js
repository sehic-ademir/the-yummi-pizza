import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quantity: 0,
            pizza: '',
         }
         this.handleAddPizza = this.handleAddPizza.bind(this);
         this.handleDeletePizza = this.handleDeletePizza.bind(this);

    }
    componentDidMount() {
        this.getPizza();
        this.setState({
            quantity: this.props.quantity
        });
    }
    async getPizza(){
        let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        let quantity = 0;
        let thisPizza = '';
        for(let i = 0; i < Object.keys(cart).length; i++){
            if(Object.values(cart)[i]['id'] === this.props.id){
                quantity = Object.values(cart)[i]['quantity'];
                thisPizza = cart[i];
            }
        }
        this.setState({
            pizza: thisPizza,
            quantity: quantity
        });

    }
    handleAddPizza(e){
        e.preventDefault();
        let quantity = this.state.quantity;        
        if(e.target.value === '-' && quantity > 1)
            quantity--;
        else if(e.target.value === '+') 
            quantity++;
        
        let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        for(let i = 0; i < Object.keys(cart).length; i++){
        if(Object.values(cart)[i]['id'] === this.props.id)
            Object.values(cart)[i]['quantity'] = quantity;
        }
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
        this.getPizza();
    }
    handleDeletePizza(e){
        e.preventDefault();
        let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        for(let i = 0; i < Object.keys(cart).length; i++){
            if(Object.values(cart)[i]['id'] === this.props.id){
                let before = JSON.parse(localStorage.getItem('cart'));
                before = before.splice(0, i);
                let after = JSON.parse(localStorage.getItem('cart'));
                after = after.splice(i+1);
                let newCart = before.concat(after);
                localStorage.removeItem('cart');
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            }
            this.getPizza();
    }
    render() {
        const {
            name,
            ingredients,
            price,
            photo
        } = this.state.pizza;
        return ( 
            <section>
                 {this.state.pizza ?
            <div className="col-xl-12 row no-gutters">
                
                <div className="col-xl-3 col-lg-4 col-md-3 col-12 text-center">
                    <img src={`https://the-yummi-pizza-sehic.herokuapp.com/public/images/${photo}`} width="150" height="150" className="img-fluid" alt="food" />
                </div>
          
                <div className="col-xl-6 col-lg-4 col-md-5 col-12 my-auto text-md-left text-center row no-gutters">
                    <div className="col-xl-8 col-12">
                    <h5>{name}</h5>
                    <hr />
                    <p className="text-secondary"><span className="text-dark">Ingredients:</span> {ingredients} </p>
                </div>
                <div className="col-xl-4 my-auto ">
                    <p className="text-secondary h4 align-middle py-auto text-center">{price} €</p>
                </div>
             </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-12 my-auto">
                    <div className="row no-gutters">
                        <button className="btn btn-danger col-lg-2 col-2 offset-3" value="-" onClick={this.handleAddPizza}>-</button>
                        <input type="text" value={this.state.quantity} readOnly className="form-control col-lg-2 col-2 mx-1 text-center" />
                        <button className="btn btn-danger col-lg-2 col-2" value="+" onClick={this.handleAddPizza}>+</button>
                    </div>
                    <div className="col-lg-12 text-center mt-3"><button onClick={this.handleDeletePizza} className="btn mx-auto"><i className="fas fa-trash-alt text-danger"></i></button></div>
                </div>
                <hr className="col-12" />
            </div>
       : <div className="col-lg-12 col-12 bg-light my-4"><i className="fas fa-spinner text-danger fa-spin fa-4x"></i></div>}
            </section>
         );
    }
}
 
export default CartItem;