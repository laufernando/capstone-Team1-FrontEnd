import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import login from '../../images/usuario.png';

function LoginForm({handleChange, handleSubmit, formData}) {
    return (
            <div className="LoginForm container" style={{width: "20%"}}>
                <br></br>
                <div className="container" style={{display: "flex", width: "100%",justifyContent: "center"}}>
               <img width="170px" height="120px" src={login}></img>
               </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label><strong>E-mail:</strong></Form.Label>
                        <Form.Control onChange={handleChange} value={formData.email} type="text" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control onChange={handleChange} value={formData.password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </Form>
            </div>
        )
}

export default LoginForm;
