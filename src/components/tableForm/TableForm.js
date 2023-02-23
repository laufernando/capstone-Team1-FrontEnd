//import the boostrap compents we will be using on this form
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import dataService from "../../services/DataService";
import Modal from '../header/AgregarModal';
import AgregarForm from "../agregarForm/AgregarForm";

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
      data:[],
      currentPage: 0,      
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
    this.props.history.push(`/admin/agregar`);

  /*    this.props.history.push({
        pathname: `/admin/agregar`,
        state: { updateData: this.props.updateData() }
      });*/
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

  handleDelete = (id) => {
    this.props.onDelete(id);
  };

  render() {


    const { data } = this.props;

    return (
      <div className="container">
        <br />
        <div className="d-flex justify-content-between align-items-center">
        <Button  onClick={this.handleButtonClick} className="btn btn-secondary text-right">
          Agregar Nuevo Producto
        </Button>
        <Switch>
          <Route path="/admin/agregar" component={AgregarForm} />
        </Switch>
        </div>
        <br />
        <br />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th></th>
              <th>Marca</th>
              <th>Genero</th>
              <th>Talla</th>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.img}
                  alt={item.marca}
                  style={{ maxWidth: 60, display: "block", margin: "0 auto" }}
                />                
              </td>
              <td>{item.marca}</td>
              <td>{item.genero}</td>
              <td>{item.talla}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>{item.precio}</td>
              <td style={{ textAlign: "center" }}>
                <DropdownButton variant="secondary" title="" id="dropdown-menu">
                  <Dropdown.Item onClick={() => this.handleEdit(item._id)} className="dropdown-item-small">Edit   <FaEdit /></Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleDelete(item._id)} className="dropdown-item-small">Delete <FaTrashAlt /></Dropdown.Item>
                </DropdownButton>{' '}
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
