import React, { Component } from "react";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import FormAgregar from "../../components/agregarForm/GenderForm";

class AgregarForm extends Component {

    render() {
        return (
            <div className="AgregarForm">

                <Header />
                <h3 className="text-center" >Agregar Género</h3>
                <FormAgregar />

            </div>
        )
    }
}

export default  AgregarForm