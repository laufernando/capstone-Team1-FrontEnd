import React, { Component } from "react";
import InputPayment from "../../components/shoppingCart/InputPayment"
import Header from "../../components/header/Header";

class Buy extends Component {

    render() {
        return (
            <div className="Buy">
                <Header/>
                <InputPayment/>
            </div>
            
        )
    }
}

export default  Buy
