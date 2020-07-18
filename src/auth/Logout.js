import React, { Component } from 'react';
class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        this.logout();
    }
    async logout(){
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
        const res = await fetch('https://the-yummi-pizza-sehic.herokuapp.com/public/api/auth/logout', settings);
        if(res)
        localStorage.removeItem('id');
        window.location.reload();
    }
    else this.props.history.push('/login');
    }
    render() { 
        return ( <div></div> );
    }
}

export default Logout;