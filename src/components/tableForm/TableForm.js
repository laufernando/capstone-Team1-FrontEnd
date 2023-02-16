//import the boostrap compents we will be using on this form
import React,{ Component} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit,FaTrashAlt }  from "react-icons/fa";

class TableForm extends Component {
    state = {
        errorMessage: null,
        formData: {
            marca: "",
            genero: "",
            talla: "",
            img: "",
            descripcion: "",
            cantidad: "",
            precio: ""
        }
    }

    componentWillMount() {
        const apiURL = process.env.REACT_APP_API_URL
        fetch(`${apiURL}/api/sneaker`)
        .then((response) => {
            console.log(response);
            return response.json();
        })
    }


    render() {

        

        return (
            <div className="TableForm container">
                <br/>
                 <Button variant="primary" >
                    Agregar Nuevo Producto
                </Button>
                <br/>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Marca</th>
                            <th>Genero</th>
                            <th>Talla</th>
                            <th>Url Imagen</th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Nike</td>
                            <td>Hombre</td>
                            <td>26</td>
                            <td>URL</td>
                            <td>Tenis Juvenil</td>
                            <td>53</td>
                            <td>1,350.00</td>
                            <td><Button variant="light"><FaEdit /></Button><Button variant="light"><FaTrashAlt /></Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Nike</td>
                            <td>Mujer</td>
                            <td>23</td>
                            <td>URL</td>
                            <td>Tenis Para mujer</td>
                            <td>53</td>
                            <td>1,350.00</td>
                            <td><Button variant="light"><FaEdit /></Button><Button variant="light"><FaTrashAlt /></Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Nike</td>
                            <td>Hombre</td>
                            <td>26</td>
                            <td>URL</td>
                            <td>Tenis Juvenil</td>
                            <td>53</td>
                            <td>1,350.00</td>
                            <td><Button variant="light"><FaEdit /></Button><Button variant="light"><FaTrashAlt /></Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Nike</td>
                            <td>Mujer</td>
                            <td>24</td>
                            <td>URL</td>
                            <td>Tenis Juvenil</td>
                            <td>53</td>
                            <td>1,350.00</td>
                            <td><Button variant="light"><FaEdit /></Button><Button variant="light"><FaTrashAlt /></Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Nike</td>
                            <td>Hombre</td>
                            <td>26</td>
                            <td>URL</td>
                            <td>Tenis Juvenil</td>
                            <td>53</td>
                            <td>1,350.00</td>
                            <td><Button variant="light"><FaEdit /></Button><Button variant="light"><FaTrashAlt /></Button></td>
                        </tr>
                    </tbody>
                </Table>
                
            </div>
        )
    }
}

export default TableForm
