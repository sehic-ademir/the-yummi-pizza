import React, { Component } from 'react';
class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cart: [],
            loading: false
        }
        this.handleAddCart = this.handleAddCart.bind(this);

    }
    handleAddCart(e){
        e.preventDefault();
        this.setState({
            loading: true
        });
        const target = e.target;
        
        setTimeout(() => {
        let storage = localStorage.getItem('cart');
        storage = JSON.parse(storage);
        let alreadyExists = false;
        localStorage.removeItem("cart");
        if(storage == null)
            storage = [];
        for(let i = 0; i < Object.keys(storage).length; i++){
            if(Object.values(storage)[i]['id'] === parseInt(target.value)){
                alreadyExists = true;
                Object.values(storage)[i]['quantity'] =  Object.values(storage)[i]['quantity'] +1;
            }
        }
        if(!alreadyExists){
        storage.push({
            id: this.props.id,
            quantity: 1,
            price: this.props.price
        });
    }
        localStorage.setItem('cart', JSON.stringify(storage));
        this.setState({
            loading: false
        });
    }, 900);
    }
  
    render() { 
        return ( 
            <div className="col-lg-12 col-md-12 col-12">
                <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-3 col-12">
                    <img src={`http://127.0.0.1:8000/images/${this.props.photo}`} width="150" height="150" className="img-fluid" alt="food" />
                </div>
                <div className="col-xl-6 col-lg-4 col-md-5 col-12 my-auto text-md-left text-center">
                    <div className="">
                        <h5>{this.props.name} </h5>
                        <hr />
                        <p className="text-secondary"><span className="text-dark">Ingredients:</span> {this.props.ingredients}</p>
                    </div>
                </div>
              
                <div className="col-xl-3 col-lg-3 col-md-4 col-12 my-auto">
                <div className="">
                        <h4>{this.props.price} €</h4>
                        <br />
                        { this.props.fromOrders  ? '' :   this.state.loading ? <button className="btn btn-success add-to-cart" value={this.props.id} onClick={this.handleAddCart}><i className="fas fa-check"></i> Added to cart</button> : 
                    <button className="btn btn-danger add-to-cart" value={this.props.id} onClick={this.handleAddCart}><i className="fas fa-shopping-cart"></i> Add to cart</button> }
                       
                    </div>
                </div>
    
                </div>
            </div>
        );
    }
}
 
export default FoodItem;