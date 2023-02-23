import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/auth";
import { bindActionCreators } from "redux";
import { FaShoppingCart } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';

import AuthService from "../../authService";

function UserNav(props) {
  let client = new AuthService();


  let handleSignOut = (event) => {
    client.logout(props.auth.token).then((response) => {
      // handle success
      localStorage.removeItem('auth');
      props.actions.logout()
      props.history.push(props.location.pathname)
    })
      .catch((error) => {
        console.log(error)
      })
  }

  let userNav = (
    <>
      <Navbar.Text className="font-weight-bold mx-3">
        Welcome, Guest
      </Navbar.Text>
      <Nav.Link as={Link} to="/login" href="/login" >Sign in</Nav.Link>
      <Nav.Link as={Link} to="/register" href="/register">Register</Nav.Link>
      <Nav.Link as={Link} to="/shop" href="/shop"><FaShoppingCart /><Badge bg="secondary">0</Badge></Nav.Link>
    </>
  )
  if (props.isAuthenticated) {
    userNav = (
      <>
        <Navbar.Text className="font-weight-bold mx-3 texto" color="black">
          Hello, {props.auth.email}
        </Navbar.Text>
        <Nav.Link as={Link} to={`/updateuser/${props.auth.email}`} href={`/updateuser/${props.auth.email}`}> Edit Profile</Nav.Link>
        <Nav.Link as={Link} to={``} href={`/admin`}> </Nav.Link>
        <Dropdown>
          <Dropdown.Toggle variant="success" className='btn-primary'>
             Admin Sneaker
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/admin">Admin Console</Dropdown.Item>
            <Dropdown.Item href="/admin/gender">Admin Gender</Dropdown.Item>
            <Dropdown.Item >Admin Payment Method</Dropdown.Item>
            <Dropdown.Item >Admin size sneaker</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        <Nav.Link as={Link} to="/shop" href="/shop"><FaShoppingCart /><Badge bg="secondary">0</Badge></Nav.Link>
        
      </>
    )
  }

  return userNav;
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserNav));
