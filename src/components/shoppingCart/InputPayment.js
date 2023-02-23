import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';

import { FaPlusCircle, FaMinusCircle,FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import service from "../../services/PaymentService";
import '../../css/PaymentStyle.css'

function InputPayment() {
  const [sneakers, setSneakers] = useState(null);
  const [units, setUnits] = useState(null);
  const [paymentsMethods, setPaymentMethods] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentIndex, setIndex] = useState(0);
  const [numberUnits, setNumberUnits] = useState(0);

  const [totalAmount, setTotalAmout] = useState(0);
  const [currentUnits, setCurrentUnits] = useState(0);

  const [show, setShow] = useState(false);
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("itemsproduct", JSON.stringify(["63ec6d2c1202b1cc9019f13b", "63ec6d651202b1cc9019f13e", "63f5e10eef5ee92785a84407"]));
    console.log(":::: local values ::::" + localStorage.getItem("itemsproduct"));
    service.getDataByItems(localStorage.getItem("itemsproduct"))
      .then((response) => {
          setSneakers(response);
          setUnits(response.slice());
          createCurrentUnits(0, response);
          sumTotalAmount(response);
      }).catch((error) => {
        console.log(error);
      });

      service.getMethodsPayment()
        .then((response) => {
           setPaymentMethods(response);
        }).catch((error) => {
          console.log(error);
        });

  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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

  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => {
    setShowSuccess(false)
    history.push(`/`);
  };

  const handleConfirm = () => {
    handleClose();
    history.push(`/`);
  }


  const createCurrentUnits = (index, jsonSneakers) => {
    const imgtag = document.getElementById(index);
    let idsneaker = imgtag.dataset.value;
    let sneakerUnits = jsonSneakers.filter(function (snk) { return snk._id == idsneaker; })
    let total = sneakerUnits.map(snk => snk.precio).reduce((acc, amount) => acc + amount);
    /*let total=0;
    jsonSneakers.forEach(snk => total+=snk.precio);*/

    //"1 Unit {formatter.format(currentPrice)}"
     let currentUnits = sneakerUnits.length+((sneakerUnits.length>1)?" Units ":" Unit ")+formatter.format(total);
     setCurrentUnits(currentUnits);
     setNumberUnits(sneakerUnits.length);
  };

  const sumTotalAmount=(jsonSneakers)=>{
     let monto = jsonSneakers.map(snk => snk.precio).reduce((acc, amount) => acc + amount);

    /* const numbers = [1, 2, 3];

     let total = 0;
     numbers.forEach(num => total += num);
     
     console.log(total) // 6 */
     /*let monto = 0;
     jsonSneakers.forEach(snk => monto+=snk.precio);*/

     setTotalAmout(formatter.format(monto));
  }

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
      console.log(":::::::: Response:" + JSON.stringify(response));
      sneakers.forEach(function(sneaker) {
         saveShoppingCart(sneaker._id,response._id);
      });

        /*service.sendMailConfirm(response)
        .then((mailresponse) => {
            console.log(":::::::: Response:" + JSON.stringify(mailresponse));
        }).catch((mailerror) => {
            console.log(mailerror);
        });*/

      handleClose();
      handleShowSuccess();
     // history.push(`/`);
    }).catch((error) => {
      console.log(error);
    });

  }

  const saveShoppingCart = (sneakerid,guestid) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();

    let sneakerUnits = units.filter(function (snk) { return snk._id == sneakerid; })
    let cart = {
      "sneaker_id": sneakerid,
      "user_id": guestid,
      "date_buy":  dd+'-'+mm+'-'+yyyy,
      "unit": sneakerUnits.length
    }
      service.saveShoppingCart(JSON.stringify(cart)).then((response) => {
      console.log(":::::::: Response shopping cart:" + JSON.stringify(response));
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    console.log("::::current index :::::::" + selectedIndex);
    createCurrentUnits(selectedIndex,units)
  };

  const handleAddUnit=()=>{
    const imgtag = document.getElementById(currentIndex);
    let sneaker = sneakers.filter(function (snk) { return snk._id == imgtag.dataset.value })
    units.push(sneaker[0]);
    createCurrentUnits(currentIndex,units);
    sumTotalAmount(units);
    console.log(":::: sneakers"+sneakers.length);
    console.log(":::: units"+units.length);
  }
  const handleDeleteUnit=()=>{
     if(units.length=1){
        return;
     }

    const imgtag = document.getElementById(currentIndex);
    let sneaker = sneakers.filter(function (snk) { return snk._id == imgtag.dataset.value })
    let indexUnit = units.indexOf(sneaker[0]);
    console.log(":::: Indice a Eliminar :::::: "+indexUnit);
    console.log("::: pre Json ::"+JSON.stringify(units));
    deleteByIndex(indexUnit)
    console.log("::: post Json ::"+JSON.stringify(units));

    createCurrentUnits(indexUnit,units);
    sumTotalAmount(units);
    /*
    Array.prototype.removeByValue = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
          this.splice(i, 1);
          i--;
        }
      }
      return this;
    }
    console.log(":::: pre units "+JSON.stringify(units));
    units.removeByValue(sneaker[0]);
    console.log(":::: post units "+JSON.stringify(units));
    units.reduce( (previousValue, currentValue) => previousValue + currentValue, 0);*/

  }

  const deleteByIndex = index => {
    setUnits(oldValues => {
      return oldValues.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (event) => {
    console.log("::::::: Inicio :::::::::");
    if(Object.keys(name).length === 0 || Object.keys(email).length === 0){
      setValidated(true);
      return;
    }
    
    setShow(true);
     console.log("::::::: Llego al final :::::::::");
  };

  return (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  }} >
    <Form style={{ backgroundColor: "#B0E0E6", width: "90%",height: "100%",marginTop:'4%' ,borderRadius:9 }}>
    
      <Container>
      
        <Row>
          <Col>
            <Card style={{ width: '35rem',marginTop:'4%' }} >
              <Carousel activeIndex={currentIndex} onSelect={handleSelect} >
                {sneakers.map((item, index) => (
                  <Carousel.Item >
                    <img className="d-block w-100" data-value={item._id} src={item.img} id={index} style={{ width: 250, height: 320 }} />
                  </Carousel.Item>
                ))}
              </Carousel>

              <Card.Body>
                <Container >
                  <Row className="roomfac">
                    <Col><Button variant="primary" onClick={handleAddUnit} > <FaPlusCircle /> </Button></Col>
                    <Col>
                       {numberUnits>1
                        ?<Button variant="primary" onClick={()=>handleDeleteUnit()} > <FaMinusCircle /> </Button> 
                        :<Button variant="primary" onClick={()=>handleDeleteUnit()} > <FaTrashAlt /> </Button>
                       } 
                    </Col>
                    <Col>
                      <Form.Label style={{ width: 100 }} >
                        {currentUnits}
                      </Form.Label>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Form style={{ width: "100%",marginTop:'4%'  }} validated={validated}   onSubmit={handleSubmit} >


              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Purchase confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container >
                    <Row >
                      <Col>
                        <img className="d-block w-100" src="https://doglovers.co.zw/wp-content/uploads/2020/05/payment-options-paypal-credit-card-png.png"
                         width="100%" height="100%" />
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
                  <Button variant="primary" onClick={handleClick}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>


              <Modal show={showSuccess} onHide={handleHideSuccess}>
                <Modal.Header closeButton>
                  <Modal.Title>Purchase confirmation</Modal.Title>
                </Modal.Header>
               
                <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'center' }} >
                  <img className="d-block w-75" src="/paloma.png"  />
                </div>
                
                <Modal.Footer style={{ display: "flex", justifyContent: "center",}} >
                  <Button variant="primary" onClick={handleHideSuccess}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>


              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter full name" value={name} onChange={handleNameChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="text" placeholder="Enter email" value={email} onChange={handleEmailChange} />
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
              
                <Form.Control required as="select" placeholder="Select payment method" value={paymentMethod} onChange={handlePaymentMethodChange} >
                  {paymentsMethods.map(method => (
                    <option value={method._id}>{method.paymentMethod}</option>
                  ))}
                </Form.Control >

              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Total{' '}{totalAmount}</Form.Label>
               </Form.Group>

              <Button variant="primary" onClick={handleSubmit} >
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