import Form from 'react-bootstrap/Form'
import React, { useState } from "react";


function AgregarForm({ handleSubmit }) {

  //const state={ gender: null }
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
};  

  //handleChange = (e) => this.setState({gender: e.target.value})


  return (
    <div className="AgregarForm container">
      <Form onSubmit={handleSubmit} id="myForm">
        <Form.Group controlId="paymentMethod">
          <Form.Label>Método de Pago:</Form.Label>
          <Form.Control  required type="text" placeholder="Type metodo" value={paymentMethod} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AgregarForm