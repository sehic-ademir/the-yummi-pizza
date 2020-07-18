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
        const res = await fetch('http://127.0.0.1:8000/api/auth/logout', settings);
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