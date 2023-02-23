import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';

import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import service from "../../services/PaymentService";
import '../../css/PaymentStyle.css'

function InputPayment() {
  const [sneakers, setSneakers] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentIndex, setIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [totalAmount, setTotalAmout] = useState(0);

  const [show, setShow] = useState(false);
  const history = useHistory();


  useEffect(() => {
    localStorage.setItem("itemsproduct", JSON.stringify(["63ec6d2c1202b1cc9019f13b", "63ec6d651202b1cc9019f13e", "63f5e10eef5ee92785a84407"]));
    console.log(":::: local values ::::" + localStorage.getItem("itemsproduct"));
    service.getDataByItems(localStorage.getItem("itemsproduct"))
      .then((response) => {
        setSneakers(response);
        let total = JSON.parse(JSON.stringify(response)).map(sneak => sneak.precio).reduce((acc, amount) => acc + amount);
        setTotalAmout(total);

        initializeCarrousel(0, response);

      }).catch((error) => {
        console.log(error);
      });

  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    handleClose();
    history.push(`/`);
  }
  const initializeCarrousel = (indexValue, sneakers) => {
    console.log("::::: Index value ::::::" + indexValue);
    const rootElement = document.getElementById(indexValue);
    let host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    let resource = rootElement.src;
    let sneak = sneakers.filter(function (element) { return element.img == resource.replace(host, ""); })
    setCurrentPrice(sneak[0].precio)
  };
  const guest = {
    "name": name,
    "email": email,
    "address": address,
    "phone": phone,
    "paymentMethod": paymentMethod,
    "active": 1
  }

  if (!sneakers) {
    return <div>Cargando...</div>;
  }


  const handleClick = () => {
    console.log("::::: test succefull ::::::::" + JSON.stringify(guest));
    service.createGuest(JSON.stringify(guest)).then((response) => {
      console.log(":::::::: Response:" + JSON.parse(response));
      let jsonGuest = JSON.parse(response);

    }).catch((error) => {
      console.log(error);
    });
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    console.log("::::current index :::::::" + selectedIndex);

    const rootElement = document.getElementById(selectedIndex);

    let host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    let resource = rootElement.src;
    let sneak = sneakers.filter(function (element) { return element.img == resource.replace(host, ""); })
    setCurrentPrice(sneak[0].precio)
  };

  return (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  }} >
    <Form style={{ backgroundColor: "azure", width: "80%" }}>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: '35rem',marginTop:'4%' }} >
              <Carousel activeIndex={currentIndex} onSelect={handleSelect} >
                {sneakers.map((item, index) => (
                  <Carousel.Item >
                    <img className="d-block w-100" src={item.img} id={index} style={{ width: 250, height: 320 }} />
                  </Carousel.Item>
                ))}
              </Carousel>

              <Card.Body>
                <Container >
                  <Row className="roomfac">
                    <Col><Button variant="primary"> <FaPlusCircle /> </Button></Col>
                    <Col><Button variant="primary"> <FaMinusCircle /> </Button></Col>
                    <Col>
                      <Form.Label style={{ width: 100 }} >
                        1 Unit {formatter.format(currentPrice)}
                      </Form.Label>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Form style={{ width: "100%" }} >


              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Purchase confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container >
                    <Row className="roomfac">
                      <Col>
                        <img className="d-block w-100" src="https://i.imgur.com/WIAP9Ku.jpg" width="120px" height="55px" />
                      </Col>
                      <Col>
                        <img className="d-block w-100" src="https://i.imgur.com/OdxcctP.jpg" width="120px" height="55px" />
                      </Col>
                      <Col>
                        <img className="d-block w-100" src="https://i.imgur.com/cMk1MtK.jpg" width="120px" height="55px" />
                      </Col>
                    </Row>
                  </Container>
                  <Form.Group className="mb-3" >
                    <Form.Label>Name card</Form.Label>
                    <Form.Control type="text" placeholder="Jhon Doe" />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="0000 0000 0000 0000" />
                  </Form.Group>


                  <Row className="g-2">
                    <Col md>
                      <Form.Group className="mb-3" >
                        <Form.Label>Expiry date</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" />
                      </Form.Group>
                    </Col>
                    <Col md>
                      <Form.Group className="mb-3" >
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="00/00" />
                      </Form.Group>
                    </Col>
                  </Row >
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>


              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" value={name} onChange={handleNameChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" value={address} onChange={handleAddressChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" value={phone} onChange={handlePhoneChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPayment">
                <Form.Label>Payment method</Form.Label>
                <Form.Control type="text" placeholder="Enter payment" value={paymentMethod} onChange={handlePaymentMethodChange} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Total</Form.Label>
                <Form.Control type="text" placeholder="Total" value={formatter.format(totalAmount)} />
              </Form.Group>

              <Button variant="primary" onClick={handleShow} >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </Form>
  </div>    
  );

}

export default InputPayment;