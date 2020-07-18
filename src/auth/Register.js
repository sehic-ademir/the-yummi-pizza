import React, { Component } from 'react';
import Logo from '../images/YUMMIpizza.svg';
import pizzaPhoto from '../images/formphoto.png'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            password_confirmation: '',
            registration_errors: '',
         }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        let token = localStorage.getItem('id');
        if(token){
            this.props.history.push('/');
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const {
            name,
            email,
            password,
            password_confirmation
        } = this.state;
        const bodyData = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        };
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        };
        try {
            const fetchResponse = await fetch('https://the-yummi-pizza-sehic.herokuapp.com/public/api/auth/signup', settings);
            const data = await fetchResponse.json();
            if(fetchResponse.status > 401){
                this.setState({
                    registration_errors: data.errors[0].msg
                });
            }
                else if(fetchResponse.status === 201){
                    this.setState({
                        registration_errors: '',
                    });
                    localStorage.setItem('id', data['token']);
                    console.log(localStorage.getItem('id'));
                    window.location.reload();

                }
                console.log(data.errors[0].msg);
                
            return data;
        } catch (e) {
            return e;
        }    
    
    }
        handleChange(e){
        e.preventDefault();   
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() { 
        return ( <div className="col-xl-10 mx-auto col-lg-12 col-md-12 col-12 row no-gutters mt-3 px-0 login-register-box rounded">
            <form onSubmit={this.handleSubmit} className="rounded col-xl-7 mx-auto text-light login-register">
                <div className="p-5 my-5">
                <div className="mb-5">
                    <img src={Logo} className="img-fluid" width="150" height="150" alt="logo" />
                    <h2 className="register-title">The Yummi Pizza - Register</h2>
                </div>
                    <div class="form-group">
                        <label for="name" className="col-xl-8 col-lg-12 col-md-12 align-self-center text-left">Name</label>
                        <input type="text" class="form-control col-xl-8 mx-auto col-lg-6 col-md-5 align-self-center" id="name" name="name"  value={this.state.name || ''} onChange={this.handleChange} required />
                    </div>
                    <div class="form-group">
                        <label for="email" className="col-xl-8 col-lg-12 col-md-12 align-self-center text-left">Email address</label>
                        <input type="email" class="form-control col-xl-8 mx-auto col-lg-6 col-md-5 align-self-center" id="email" name="email"  value={this.state.email || ''} onChange={this.handleChange} required />
                    </div>
                    <div class="form-group">
                        <label for="password" className="col-xl-8 col-lg-12 col-md-12 align-self-center text-left">Password</label>
                        <input type="password" class="form-control col-xl-8 mx-auto col-lg-6 col-md-5 align-self-center" id="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <div class="form-group">
                        <label for="password_confirmation" className="col-xl-8 col-lg-12 col-md-12 align-self-center text-left">Confirm Password</label>
                        <input type="password" class="form-control col-xl-8 mx-auto col-lg-6 col-md-5 align-self-center" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                    </div>
                    <p className="text-danger">{this.state.registration_errors}</p>
                    <button type="submit" class="btn btn-danger mt-3">Register</button>
                </div>
                </form>
                <div className="col-xl-5 col-lg-6 d-none d-md-inline-block formPhoto" style={{backgroundImage: `url(${pizzaPhoto})`}}>
            </div>
            
        </div> );
    }
}
 
export default Register;
