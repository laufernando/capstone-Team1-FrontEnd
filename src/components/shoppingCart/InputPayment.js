import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

import service from "../../services/PaymentService";
import '../../css/PaymentStyle.css'

function InputPayment() {
  const [sneakers, setSneakers] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    localStorage.setItem("itemsproduct", JSON.stringify(["63ec6d2c1202b1cc9019f13b","63ec6d651202b1cc9019f13e","63f5e10eef5ee92785a84407"]));
    console.log(":::: local values ::::"+localStorage.getItem("itemsproduct"));
    service.getDataByItems(localStorage.getItem("itemsproduct"))
      .then((response) => {
        setSneakers(response);
      })
      .catch((error) => {
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

  return (

    <Container>
      <Row>
        <Col>
          <Card style={{ width: '35rem' }}>
            <Carousel  >
            {sneakers.map(item => (
                      <Carousel.Item>
                        <img className="d-block w-100" src={item.img}  />
                      </Carousel.Item>
                        ))}
            </Carousel>

            <Card.Body>
              <Container >
                <Row className="roomfac">
                  <Col><Button variant="primary"> <FaPlusCircle/> </Button></Col>
                  <Col><Button variant="primary"> <FaMinusCircle/> </Button></Col>
                  <Col>
                    <Form.Label>
                      1 Unidad
                    </Form.Label>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Form style={{ width: "100%" }} >
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

            <Button variant="primary" onClick={handleClick} >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}

export default InputPayment;