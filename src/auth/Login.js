import React, { Component } from 'react';
import Logo from '../images/YUMMIpizza.svg';
import pizzaPhoto from '../images/formphoto.png'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            registration_errors: '',
            ip: '',
            logging_in: false
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
        this.setState({
            logging_in: true
        })
        const {
            email,
            password,
        } = this.state;
        const bodyData = {
            email: email,
            password: password,
            remember_me: true
        };
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(bodyData)
        };
        try {
            const fetchResponse = await fetch(`http://the-yummi-pizza-sehic.herokuapp.com/public/api/auth/login`, settings);
            const data = await fetchResponse.json();
            if(fetchResponse.status > 400){
                this.setState({
                    registration_errors: data.errors[0].msg
                });
            }
                else if(fetchResponse.status === 200){
                    this.setState({
                        registration_errors: '',
                    });
                    localStorage.setItem('id', data['access_token']);
                    window.location.reload();
                  
                }
                
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
                  {this.state.logging_in ?  <img src={Logo} className="img-fluid fa-spin" width="150" height="150" alt="logo" /> :  <img src={Logo} className="img-fluid" width="150" height="150" alt="logo" /> }
                    <h2 className="register-title">The Yummi Pizza - Login</h2>
                </div>
                    <div class="form-group">
                        <label htmlFor="email" className="col-xl-8 col-lg-12 col-md-12 align-self-center text-left">E-mail</label>
                        <input type="email" class="form-control col-xl-8 mx-auto col-lg-12 col-md-12 align-self-center" id="email" name="email"  value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div class="form-group">
                        <label htmlFor="password" className="col-xl-8 col-lg-12 col-md-12 align-self-center text-left">Password</label>
                        <input type="password" class="form-control col-xl-8 mx-auto col-lg-12 col-md-12 align-self-center" id="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <p className="text-danger">{this.state.registration_errors}</p>
                    <button type="submit" class="btn btn-danger w-50 mt-5">Login</button>
                </div>
            </form>
            <div className="col-xl-5 col-lg-6 d-none d-md-inline-block formPhoto rounded" style={{backgroundImage: `url(${pizzaPhoto})`}}>
            </div>
        </div> );
    }
}
 
export default Login;
