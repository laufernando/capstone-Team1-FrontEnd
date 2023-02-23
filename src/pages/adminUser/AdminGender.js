import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import DataService from "../../services/CatalogService";

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TableGender";
import AgregarForm from "../../components/agregarForm/GenderForm";
import "../../css/body.css"


class GenderCatalog extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
    }

    componentDidMount() {
        DataService.getGenderData().then((result) => {
          this.setState({ data: result });
        });
      }
      
      handleDelete = (id) => {
        console.log(id);
        DataService
        .deleteData(id)
        .then((response) => {
          console.log(response.data);
          alert('Se borro el genero con id: '+id);
          DataService.getGenderData().then((result) => {
            this.setState({ data: result });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      };

          
      handleSubmit = () => {

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
      };

    render() {
        return (
            <div className="GenderCatalog">

                <Header />
                <br></br>
                <br></br>
                <h5>Catálogo de Género</h5>
                
                <Router>
                    <Switch>
                        <Route path="/admin/agregargender/">
                            <AgregarForm />
                        </Route>                        
                        <Table data={this.state.data} onDelete={this.handleDelete} onSubmit={this.handleSubmit}/>
                    </Switch>
                </Router>  

            </div>
        )
    }
}

export default  GenderCatalog
