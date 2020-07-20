import React, { Component } from 'react';
import FoodItem from './FoodItem';
import Loader from '../nav/loader/Loader';
import pizzaHeader from '../images/pizza-header.png';
class FoodMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pizza: [],
            isLoaded: false
         }

    }
    componentDidMount() {
        let localStg = JSON.parse(localStorage.getItem('foodMenu'));
        if(localStg.length < 1){
            this.getPizzas();  
        }
        else {
            setTimeout(() => {
                this.setState({
                    isLoaded: true,
                    pizza: JSON.parse(localStorage.getItem('foodMenu'))
                });
            }, 100);
        }
    }
    async getPizzas(){
       
        const res = await fetch('https://the-yummi-pizza-sehic.herokuapp.com/public/api/pizza/index');
        const json = await res.json();
        this.setState({
            pizza: json,
            isLoaded: true
        });
        console.log(json);
        localStorage.setItem('foodMenu', JSON.stringify(json));
    }
    render() { 
        const pizza = this.state.pizza;
        return ( 
            <div className="food-menu">
            {this.state.isLoaded ? 
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mx-auto row no-gutters menu-section px-0">
            <div className="header-menu col-xl-12"  style={{ backgroundImage: `url(${pizzaHeader})`}}>
                <div className="text-center col-xl-12 px-0">
                    <div className="my-auto">
                   <div className="text-light bg-transparent-dark py-3"> <h1>The Yummi Pizza</h1>
                    <hr className="border-light w-25" /> 
                    <h3>Your favorite pizza place</h3>
                    </div>
                    <a href="#order" className="btn btn-danger btn-lg mt-md-5">ORDER NOW</a>
                    </div>
                </div>
            </div>
        <div className="col-xl-12 text-light col-lg-12 col-md-12 col-12 mb-5">
        <h1 className="caption-menu bg-dark" id="order">Pizza</h1>
        </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 row no-gutters">
          {  pizza.map((pizza) => 
            pizza.category === 'pizza' ?
            <div key={pizza.id} className="col-xl-6 col-lg-6 col-md-12"><FoodItem name={pizza.name} price={pizza.price} ingredients={pizza.ingredients} id={pizza.id} photo={pizza.photo} /> <hr className="col-md-10"/></div>
            : ''    )    
        }
      </div>
      <div className="col-xl-12 text-light col-lg-12 col-md-12 col-12 mb-5">
        <h1 className="caption-menu bg-dark" id="order">Pasta</h1>
        </div>
            <div className="col-xl-12 col-lg-8 col-md-8 col-12 row no-gutters">
          {  pizza.map((pizza) => 
            pizza.category === 'pasta' ?
            <div key={pizza.id} className="col-xl-6"><FoodItem name={pizza.name} price={pizza.price} ingredients={pizza.ingredients} id={pizza.id} photo={pizza.photo} /> <hr className="col-md-10"/></div>
            : ''    )    
        }
      </div>
        </div>
        
        : <Loader /> }
        </div>
        );
    }
}
 
export default FoodMenu;