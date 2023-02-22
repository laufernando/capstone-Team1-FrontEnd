import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DataService from "../../services/DataService";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TableForm";
import ModificarForm from "../../components/agregarForm/ModificarForm";
import AgregarForm from "../../components/agregarForm/AgregarForm";
import { isAuthenticated } from "../../utils/authHelper";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";

class AdminUser extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
    }

    componentDidMount() {
        DataService.getData().then((result) => {
          this.setState({ data: result });
        });
    }

    handleDelete = (id) => {
        console.log(id);
        DataService
        .deleteSneaker(id)
        .then((response) => {
          console.log(response.data);
          alert('Product deleted succeful');
          DataService.getData().then((result) => {
            this.setState({ data: result });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      };

    render() {
        return (
            <div className="AdminUser">

                <Header isAuthenticated={isAuthenticated()}/>

                <h3 className="text-center" >Admin Profile</h3>
                <Router>
                    <Switch>
                        <Route path="/admin/modificar/:id">
                            <ModificarForm />
                        </Route>
                        <Route path="/admin/agregar/">
                            <AgregarForm />
                        </Route>                        
                        <Table data={this.state.data} onDelete={this.handleDelete}/>
                    </Switch>
                </Router>                
            </div>
        )
    }
}

export default  mustBeAuthenticated(AdminUser);
