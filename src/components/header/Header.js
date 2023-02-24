import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import UserNav from './UserNav';
import '../../css/nav-style.css';
import Logo from '../../images/shoe.png';
import { useState } from "react";
function Header(props) {

  return (
    <div className="Navbar mb-3">
      <Navbar className="color-nav" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand as={Link} to="/"><img width="95px" height="40px"  src={Logo}/> Sneaker Fever</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={props.location.pathname} className="ml-auto">
            <UserNav
              isAuthenticated={props.isAuthenticated}
              prodCount ={props.countProd}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(Header);
