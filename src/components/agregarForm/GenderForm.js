import Form from 'react-bootstrap/Form'
import React, { useState } from "react";


function AgregarForm({ handleSubmit }) {

  //const state={ gender: null }
  const [gender, setGender] = useState("");
  
  const handleChange = (e) => {
    setGender(e.target.value);
};  

  //handleChange = (e) => this.setState({gender: e.target.value})


  return (
    <div className="AgregarForm container">
      <Form onSubmit={handleSubmit} id="myForm">
        <Form.Group controlId="gender">
          <Form.Label>Género:</Form.Label>
          <Form.Control  required type="text" placeholder="Type género" value={gender} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AgregarForm