import React, { Component } from 'react';
import OrderProcessing from './OrderProcessing';
class CartOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            phone: '',
            note: '',
            haha: 'dudee'
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);

    }
   
    handleChange(e){
        e.preventDefault();   
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        localStorage.removeItem('cart');
    }
    render() { 
        
        return ( 
            <div className="p-4">
            <h4 className="text-left col-12 mb-3">Order Summary</h4>
            <div>
            <div className="row px-4">
                    <div className="col-xl-6 text-left">{this.props.quantity} items</div>
                    <div className="col-xl-6 text-right">{this.props.totalPrice} € (${this.props.USD})</div>
                </div>
                <div className="row px-4">
                    <div className="col-xl-6 text-left">Delivery fee</div>
                    <div className="col-xl-6 text-right">{(this.props.deliveryPrice).toFixed(2)} € (${(this.props.deliveryPrice * this.props.USDcurrency).toFixed(2)} )</div>
                </div>
                <hr className="border-secondary px-4" />
                <div className="row px-4">
                    <div className="col-xl-6 text-left">Total cost</div>
                    <div className="col-xl-6 text-right"> {this.props.priceWithDelivery} € (${this.props.priceWithDeliveryUSD})</div>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="mt-4 px-4">
                    <p>Address</p>
                    <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.handleChange} required />
                </div>
                <div className="mt-4 px-4">
                    <p>Phone number</p>
                    <input type="tel" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} required />
                </div>
                <div className="mt-4 px-4">
                    <p>Note</p>
                    <input type="text" className="form-control" placeholder="example: No olives" name="note" value={this.state.note} onChange={this.handleChange} />
                </div>
                <div className="my-5 col-12">
                    
               <OrderProcessing onClick={this.handleSubmit} address={this.state.address} phone={this.state.phone} note={this.state.note} totalCostEuro={this.props.priceWithDelivery} totalCostUSD={this.props.priceWithDeliveryUSD} type="submit" />
                </div>
                </form>
            </div>
        </div>
         );
    }
}
 
export default CartOrder;