//import the boostrap compents we will be using on this form
import React, { Component, useRef } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import GenderForm from '../agregarForm/GenderForm'
import '../../css/table-style.css'
import DataService from '../../services/CatalogService';


class TableGender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            formData: {
                id: "",
                genero: "",
            },
            data: [],
            shouldRedirectNew: false,
            shouldRedirectEdit: false,
            isOpen: false,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleButtonClickEdit = this.handleButtonClickEdit.bind(this);
        this.handleDeleteData = this.handleDeleteData.bind(this);
    }

    handleButtonClick() {
        this.setState({
            shouldRedirectNew: true,
        });
    }

    handleButtonClickEdit() {
        this.setState({
            shouldRedirectEdit: true,
        });
    }



    handleOpenModal() {

        this.setState({ isOpen: true });
    }

    handleCloseModal() {
        this.setState({ isOpen: false });
    }


    handleDeleteData(id) {
        this.props.onDelete(id);

        alert("Eliminando genero con id: " + id);

    }



   

    render() {


        const { data } = this.props;
      

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Form was submitted, now the modal can be closed");
            this.setState({ value: e.target.value });

            DataService.postGenderData(e.target[0].value)
            console.log(e.target[0].value)
            this.handleCloseModal();
        }  

        return (
            <>
                <div className="TableForm container">
                    <br />
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Género</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                        <Button variant="light" style={{ margin: "10px" }} onClick={this.handleOpenModal} >
                                            <FaPlusSquare />
                                        </Button>
                                        <Button variant="light" style={{ margin: "10px" }} onClick={() => this.handleDeleteData(item._id)} >
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Modal show={this.state.isOpen} onHide={this.handleCloseModal}>
                    <Modal.Body>
                        <GenderForm handleSubmit={handleSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" form="myForm">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default TableGender
