import React, { Component } from "react";

import Alert from 'react-bootstrap/Alert';

import Header from "../../components/header/Header";

import Table from "../../components/tableForm/TableForm";

class AdminUser extends Component {

    render() {
        return (
            <div className="AdminUser">

                <Header />

                <h3 className="text-center" >Admin Profile</h3>
                <Table/>

            </div>
        )
    }
}

export default  AdminUser
