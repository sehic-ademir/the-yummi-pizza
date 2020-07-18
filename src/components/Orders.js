import React, { Component } from 'react';
import FoodItem from './FoodItem';
import Loader from '../nav/loader/Loader';
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: ''
         }
    }
    // This is excluded until payment process is implemented. 
    // http://127.0.0.1:8000/api/orders/create 
    //  body
    // address
    // phone
    // note
    // user_id
    // pizza_id []

    componentDidMount() {
        let token = localStorage.getItem('id');
        if(!token){
            this.props.history.push('/');
        }
        this.getOrders();
    }
    async getOrders(){
        const id = localStorage.getItem('OrderID');
        if(id) {
            let data = [];
            const getOrders = await fetch('http://127.0.0.1:8000/api/orders/getOrders/' + id);
            const ordersJson = await getOrders.json();
            data = JSON.stringify(data);
            data = JSON.parse(data);
            for(let i = 0; i < ordersJson.length; i++){
                data.push({
                    id: ordersJson[i]['id'],
                    ordered_at: ordersJson[i]['created_at'],
                    address: ordersJson[i]['address'],
                    phone: ordersJson[i]['phone']
                });
                data[i]['order'] = [{}];
            const getSingleOrder = await fetch('http://127.0.0.1:8000/api/orders/getOrderProducts/' + ordersJson[i]['id']);
            const singleOrderJson = await getSingleOrder.json();
                for(let j = 0; j < singleOrderJson.length; j++){
                    const getPizza = await fetch('http://127.0.0.1:8000/api/pizza/one/' + singleOrderJson[j]['pizza_id']);
                    const pizzaJson = await getPizza.json();
                    data[i]['order'][j] = {
                        name: pizzaJson['name'],
                        ingredients: pizzaJson['ingredients'],
                        price: pizzaJson['price'],
                        photo: pizzaJson['photo']
                    };
                }
            }
            this.setState({
                data: data
            });
        }
    }
    render() { 
        const data = this.state.data;
        return ( 
        <div className="mt-2">
            {data ? 
            data.map((order, key) => 
            <div className="border pb-4 row no-gutters">
                <div className="col-lg-12 bg-dark mb-2 row no-gutters">
                    <p className="col-lg-6 my-2 text-light text-left pl-4">Address: {order.address}, phone: {order.phone}</p>
                    <p className="col-lg-6 my-2 text-light text-right pr-4">Date: {order.ordered_at}</p>
                </div>
           { order['order'].map((orderItem) => 
           <div  className="col-lg-6 my-2"> <FoodItem photo={orderItem.photo} price={orderItem.price} name={orderItem.name} ingredients={orderItem.ingredients} fromOrders={true} /> </div>
            )}
            </div>
            )
             : <Loader /> 
        }
        </div> );
    }
}
 
export default Orders;