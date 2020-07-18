import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/YUMMIpizza.svg';
import { Link } from 'react-router-dom';
import './navs.css';
class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      const username = this.props.username;

        return ( 
    <Navbar bg="danger" className="text-dark" expand="lg">
       <Link to="/"><Navbar.Brand className="text-light d-lg-none"><Image src={Logo} width="60" height="60" alt="white-car" /> <h6>THE YUMMI PIZZA</h6></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-light">
          <Nav className="mr-auto"> 
            <Link to="/" className="nav-link text-light mr-lg-4 h5">HOME</Link>
          </Nav>
          <Link to="/"><Navbar.Brand className="text-light d-none d-lg-block"><Image src={Logo} width="60" height="60" alt="white-car" /></Navbar.Brand></Link>

          <Nav className="ml-lg-auto">
          {username ? 
              <NavDropdown className="border-light text-light mr-lg-4" title={<i className="fas fa-user mr-2 h5"></i>} id="basic-nav-dropdown-2">
              {/* <Link to={`/orders`} className="dropdown-item"><i className="fas fa-user mr-2"></i>{username}</Link> */}
              {/* <NavDropdown.Divider /> */}
              <Link to={`/logout`} className="dropdown-item" ><i className="fas fa-sign-out-alt"></i> Logout</Link>
            </NavDropdown>
            :
            <NavDropdown className="border-light text-light mr-lg-4" title={<i className="fas fa-user mr-2 h5"></i>} id="basic-nav-dropdown-2">
              <Link to="/login" className="nav-link text-dark h5"><i className="fas fa-sign-in-alt"></i> Login</Link>
              <NavDropdown.Divider />
              <Link to="/register" className="nav-link text-dark h5"><i className="fas fa-user-alt"></i> Register</Link>
            </NavDropdown>}
            <Link to="/cart" className="nav-link text-light h5"><i className="mr-2 fas fa-shopping-cart align-self-center"></i> CART <span className="font-weight-bold">{this.props.quantity > 1 ? '('+ this.props.quantity+ ')' : '' }</span></Link>
            </Nav>
          

        </Navbar.Collapse>
      </Navbar> );
    }
}
 
export default NavigationBar;