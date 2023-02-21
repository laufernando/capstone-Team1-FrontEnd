import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DataService from "../../services/DataService";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TableForm";
import ModificarForm from "../../components/agregarForm/ModificarForm";

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

    render() {
        return (
            <div className="AdminUser">

                <Header />

                <h3 className="text-center" >Admin Profile</h3>
                <Router>
                    <Switch>
                        <Route path="/admin/modificar/:id">
                            <ModificarForm />
                        </Route>
                        <Table data={this.state.data}/>
                    </Switch>
                </Router>
                

            </div>
        )
    }
}

export default  AdminUser
