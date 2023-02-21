//import the boostrap compents we will be using on this form
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import Modal from '../header/AgregarModal';

class TableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      formData: {
        marca: "",
        genero: "",
        talla: "",
        img: "",
        descripcion: "",
        cantidad: "",
        precio: "",
      },
      shouldRedirectNew: false,
      shouldRedirectEdith: false,
      isModalOpen: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleButtonClickEdith = this.handleButtonClickEdith.bind(this);
  }

  handleButtonClick() {
    this.setState({
      shouldRedirectNew: true,
    });
  }

  handleButtonClickEdith() {
    this.setState({
      shouldRedirectEdith: true,
    });
  }  

  handleOpenModal() {
    console.log('Hace algo')
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

   handleEdit = (id) => {
    console.log(id);
    this.props.history.push(`/admin/modificar/${id}`);
  };

  render() {
    if (this.state.shouldRedirectNew) {
      return <Redirect to="/admin/agregar" />;
    }

    if (this.state.shouldRedirectEdith) {
        return <Redirect to="/admin/modificar" />;
    }

    const { data } = this.props;

    return (
      <div className="TableForm container">
        <br />
        <Button variant="primary" onClick={this.handleButtonClick}>
          Agregar Nuevo Producto
        </Button>
        <br />
        <br />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Marca</th>
              <th>Genero</th>
              <th>Talla</th>
              <th>Url Imagen</th>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index}</td>
              <td>{item.marca}</td>
              <td>{item.genero}</td>
              <td>{item.talla}</td>
              <td>{item.img}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>{item.precio}</td>
              <td>
                <Button variant="light" onClick={() => this.handleEdit(item._id)}>
                  <FaEdit />
                </Button>
                <Button variant="light">
                  <FaTrashAlt />
                </Button>
              </td>              
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default  withRouter(TableForm);
