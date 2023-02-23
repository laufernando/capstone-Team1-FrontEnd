//import the boostrap compents we will be using on this form
import React, { Component, useRef } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import PaymentForm from '../agregarForm/PaymentForm';
import '../../css/table-style.css'
import DataService from '../../services/CatalogService';


class TableGender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            formData: {
                id: "",
                paymentMethod: "",
            },
            data: [],
            isOpen: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
        this.handleGetDta = this.handleGetDta.bind(this);
    }

    handleOpenModal() {

        this.setState({ isOpen: true });
    }

    handleCloseModal() {
        this.setState({ isOpen: false });
    }


    handleDeleteData(id) {
        this.props.onDelete(id);

        alert("Eliminando metodo con id: " + id);

    }

    handleGetDta(datos){
       //this.props.updateData;
       alert('agregando nuevo método de pago');
       window.location.reload;
    }
      
       

    render() {


        const { data } = this.props;


        const handleSubmit = (e) => {
             //e.preventDefault();
            const metodo = e.target[0].value;
            const datos = JSON.stringify({ paymentMethod: metodo });
            DataService.postPaymentData(datos)
            console.log("datos: " + datos)
            this.handleGetDta(datos);
            this.handleCloseModal();
        }

        return (
            <>
                <div className="TableForm container">
                    <Button variant="primary" onClick={this.handleOpenModal} >
                        <FaPlusSquare />
                        &nbsp;Agregar
                    </Button>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Método de Pago</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>
                                        <Button variant="primary" style={{ margin: "10px" }} onClick={() => this.handleDeleteData(item._id)} >
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Modal show={this.state.isOpen} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <PaymentForm handleSubmit={handleSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" form="myForm">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        )
    }
}

export default TableGender
