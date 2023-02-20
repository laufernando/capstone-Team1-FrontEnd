import React, { Component } from "react";
import DataService from "../../services/DataService";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TableForm";

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
                
                <Table data={this.state.data}/>

            </div>
        )
    }
}

export default  AdminUser
