import React, { Component } from "react";
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';

import Header from "./Header";

import FormAgregar from "../agregarForm/AgregarForm";

Modal.setAppElement('#root');

function AgregarModal(props){
    return (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.onClose}
          contentLabel="Example Modal"
        >
          <h2>Example Modal</h2>
          <p>Modal content goes here...</p>
          <button onClick={props.onClose}>Close Modal</button>
        </Modal>
      );
}

export default AgregarModal;
