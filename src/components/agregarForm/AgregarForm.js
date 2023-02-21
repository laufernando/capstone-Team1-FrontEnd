//import the boostrap compents we will be using on this form
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import dataService from "../../services/DataService";


function AgregarForm() {

    
    const [marca, setMarca] = useState("");
    const [genero, setGenero] = useState("");
    const [talla, setTalla] = useState("");
    const [file, setFile] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");  

    const [genders, setGenders]=useState([]);
    
    useEffect(() => {
        dataService
        .getGender()
        .then((response) => {
            setGenders(response);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }, []);

    if (!genders) {
        return <div>Cargando...</div>;
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };    
    const handleMarcaChange = (e) => {
        setMarca(e.target.value);
    };        
    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
    };        
    const handleTallaChange = (e) => {
        setTalla(e.target.value);
    };        
    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
    };
    const handleCantidadChange = (e) => {
        setCantidad(e.target.value);
    };        
    const handlePrecioChange = (e) => {
        setPrecio(e.target.value);
    };
    
    function handleReset() {
        setMarca("");
        setGenero("");
        setTalla("");
        setFile(null);
        setDescripcion("");
        setCantidad("");
        setPrecio("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("marca", marca);
        data.append("genero", genero);
        data.append("talla", talla);
        data.append("descripcion", descripcion);
        data.append("cantidad", cantidad);
        data.append("precio", precio);

        
        for (const [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
          }

        
        dataService
        .uploadFile(data)
        .then((response) => {
          console.log(response.data);
          alert('Product added succeful');
          handleReset();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
        <div className="AgregarForm container">

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="marca">
                    <Form.Label><strong>Marca:</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" placeholder="Marca" value={marca} onChange={handleMarcaChange}/>
                </Form.Group>
                <Form.Group controlId="genero">
                    <Form.Label><strong>Genero:</strong></Form.Label>
                    <Form.Control  as="select" id="genero" aria-label="Default select example" value={genero} onChange={handleGeneroChange}>
                        <option>Selecciona el Genero</option>
                        {genders.map(option => (
                        <option key={option._id} value={option.gender}>{option.gender}</option>
                        ))}
                    </Form.Control >
                </Form.Group>
                <Form.Group controlId="talla">
                    <Form.Label><strong>Talla:</strong></Form.Label>
                    <Form.Control as="select" id="talla"  aria-label="Default select example" value={talla} onChange={handleTallaChange}>
                        <option>Selecciona la Talla</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </Form.Control >
                </Form.Group>

                <Form.Group controlId="img" className="mb-3">
                    <Form.Label><strong>Imagen:</strong></Form.Label>
                    <Form.Control type="file"  onChange={handleFileChange} />
                </Form.Group>

                <Form.Group controlId="descripcion">
                    <Form.Label><strong>Descripcion:</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" placeholder="Descripcion" value={descripcion} onChange={handleDescripcionChange}/>
                </Form.Group>

                <Form.Group controlId="cantidad">
                    <Form.Label><strong>Cantidad</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" placeholder="Cantidad" value={cantidad} onChange={handleCantidadChange}/>
                </Form.Group>

                <Form.Group controlId="precio">
                    <Form.Label><strong>Precio:</strong></Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" value={precio} onChange={handlePrecioChange}/>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <div className="button-group">
                    <Button variant="primary" >
                        Cancelar
                    </Button> 
                    <span>&nbsp;&nbsp;</span>
                    <Button variant="primary" type="submit" >
                        Agregar
                    </Button>   
                </div>            
            </Form>
        </div>
    )

}

export default AgregarForm
