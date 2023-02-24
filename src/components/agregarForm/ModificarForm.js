//import the boostrap compents we will be using on this form
import React, { useState, useEffect } from 'react';
import { useParams, withRouter  } from 'react-router-dom';
import DataService from "../../services/DataService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './Form.css'

const ModificarForm = (props) => {
    const [data, setData] = useState(null);
    const [genders, setGenders]=useState([]);
    const [sizes, setSizes]=useState([]);

    const [id, setId] = useState("");
    const [marca, setMarca] = useState("");
    const [genero, setGenero] = useState("");
    const [talla, setTalla] = useState("");
    const [file, setFile] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");  

    useEffect(() => {
        const { history, match } = props;
        const id = match.params.id;
        console.log('id '+id)
        DataService.getDataById(id).then((result) => {
            setData(result);
            setId(result._id)
            setMarca(result.marca);
            setGenero(result.genero);
            setTalla(result.talla);
            setDescripcion(result.descripcion);
            setCantidad(result.cantidad);
            setPrecio(result.precio);
        });

        DataService
        .getGender()
        .then((response) => {
            setGenders(response);
        })
        .catch((error) => {
        console.log(error);
        });
        DataService
        .getSize()
        .then((response) => {
            setSizes(response);
        })
        .catch((error) => {
          console.log(error);
        });        
    }, []);

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

    const handleClickCancel = () => {
        const { history, match } = props;
        history.push("/admin");
    };

    const [isImageLarge, setIsImageLarge] = useState(false);

    if (!data) {
        return <div>Cargando...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("id", id)
        data.append("file", file);
        data.append("marca", marca);
        data.append("genero", genero);
        data.append("talla", talla);
        data.append("descripcion", descripcion);
        data.append("cantidad", cantidad);
        data.append("precio", precio);

        
        DataService
        .updateSneaker(data)
        .then((response) => {
          console.log(response.data);
          alert('Product added succeful');
          setData(response.data);
          setMarca(response.data.marca);
          setGenero(response.data.genero);
          setTalla(response.data.talla);
          setDescripcion(response.data.descripcion);
          setCantidad(response.data.cantidad);
          setPrecio(response.data.precio);
          props.updateData();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
        <div className="form-with-image">
            
            <img src={data.img} alt="Example" 
            className={isImageLarge ? "form-image form-image-large" : "form-image"} 
            onMouseOver={() => setIsImageLarge(true)}
            onMouseLeave={() => setIsImageLarge(false)} />


            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="marca">
                    <Form.Label><strong>Brand:</strong></Form.Label>
                    <Form.Control required minLength="2" value={marca} type="text" placeholder="Brand" onChange={handleMarcaChange}/>
                </Form.Group>
                <Form.Group controlId="genero">
                    <Form.Label><strong>Gender:</strong></Form.Label>
                    <Form.Control  as="select" value={genero} onChange={handleGeneroChange} >
                        <option>Select gender</option>
                        {genders.map(option => (
                        <option key={option._id} value={option.gender}>{option.gender}</option>
                        ))}
                    </Form.Control >
                </Form.Group>
                <Form.Group controlId="talla">
                    <Form.Label><strong>Size:</strong></Form.Label>
                    <Form.Control as="select" value={talla} onChange={handleTallaChange}>
                        <option>Select size</option>
                        {sizes.map(option => (
                        <option key={option._id} value={option.size}>{option.size}</option>
                        ))}
                    </Form.Control >
                </Form.Group>

                <Form.Group controlId="img" className="mb-3">
                    <Form.Label><strong>Image:</strong></Form.Label>
                    <Form.Control type="file" onChange={handleFileChange}/>
                </Form.Group>

                <Form.Group controlId="descripcion">
                    <Form.Label><strong>Description:</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text"  value={descripcion} placeholder="Description" onChange={handleDescripcionChange} />
                </Form.Group>

                <Form.Group controlId="cantidad">
                    <Form.Label><strong>Quantity</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" value={cantidad} placeholder="Quantity" onChange={handleCantidadChange}/>
                </Form.Group>

                <Form.Group controlId="precio">
                    <Form.Label><strong>Price:</strong></Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" value={precio} onChange={handlePrecioChange} />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <div className="form-row">
                    <div className="form-group col-md-12">  
                    <Button type="submit" className="btn btn-primary mr-2">
                        Modify
                    </Button>                     
                    <span>&nbsp;&nbsp;</span>                  
                    <Button className="btn btn-secondary" onClick={handleClickCancel}>
                        Cancel
                    </Button>
                    </div>
                </div>
            </Form>
        </div>
    )

}

export default withRouter(ModificarForm)
