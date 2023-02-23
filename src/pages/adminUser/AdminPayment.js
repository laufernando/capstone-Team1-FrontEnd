import React, { Component } from "react";
import DataService from "../../services/CatalogService";

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TablePayment";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import { isAuthenticated } from "../../utils/authHelper";
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

  updateData = () => {
    console.log('Ejecuta esta funcion')
    DataService.getPaymentData().then((result) => {
        this.setState({ data: result });
        alert('entroupdate: ');
    });
    console.log('Actualiza el estado')
}


  render() {
    return (
      <div className="PaymentCatalog">
         <Header isAuthenticated={isAuthenticated()}/>
        <br></br>
        <br></br>
        <h5>Método de Pago</h5>
        <br></br>

        <Table data={this.state.data} onDelete={this.handleDelete} {...this.props} updateData={this.updateData}/>

      </div>
    )
  }
}

export default mustBeAuthenticated(PaymentCatalog)
