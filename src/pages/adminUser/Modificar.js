import React, { Component } from "react";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import FormModificar from "../../components/agregarForm/ModificarForm.js";

class ModificarForm extends Component {

    render() {
        return (
            <div className="AgregarForm">

                <Header />
                <h3 className="text-center" >Modificar Producto</h3>
                <FormModificar />

            </div>
        )
    }
}

export default  ModificarForm
