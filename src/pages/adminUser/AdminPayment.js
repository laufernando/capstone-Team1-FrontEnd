import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import DataService from "../../services/CatalogService";

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TablePayment";
import AgregarForm from "../../components/agregarForm/PaymentForm";
import "../../css/body.css"


class PaymentCatalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    DataService.getPaymentData().then((result) => {
      this.setState({ data: result });
    });
  }

  handleDelete = (id) => {
    console.log(id);
    DataService
      .deletePaymet(id)
      .then((response) => {
        console.log(response.data);
        alert('Se borro el pago con id: ' + id);
        DataService.getPaymentData().then((result) => {
          this.setState({ data: result });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /* handleSubmit = () => {

     DataService
     .postGenderData
     .then((response) => {
       console.log(response.data);
       alert('Se borro el genero con id');
       DataService.getGenderData().then((result) => {
         this.setState({ data: result });
       });
     })
     .catch((error) => {
       console.log(error);
     });
   };*/

  render() {
    return (
      <div className="PaymentCatalog">

        <Header />
        <br></br>
        <br></br>
        <h5>Método de Pago</h5>
        <br></br>

        <Table data={this.state.data} onDelete={this.handleDelete} />

      </div>
    )
  }
}

export default PaymentCatalog
