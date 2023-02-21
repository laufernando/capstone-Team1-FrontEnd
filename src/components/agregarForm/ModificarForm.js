//import the boostrap compents we will be using on this form
import React, { useState, useEffect } from 'react';
import { useParams, withRouter  } from 'react-router-dom';
import DataService from "../../services/DataService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './Form.css'

const AgregarForm = (props) => {
    const [data, setData] = useState(null);
    const [genders, setGenders]=useState([]);

    useEffect(() => {
        const { history, match } = props;
        const id = match.params.id;
        console.log('id '+id)
        DataService.getDataById(id).then((result) => {
            setData(result);
          });
          DataService
          .getGender()
          .then((response) => {
              setGenders(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

    const [isImageLarge, setIsImageLarge] = useState(false);

    if (!data) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="form-with-image">
            
            <img src={data.img} alt="Example" 
            className={isImageLarge ? "form-image form-image-large" : "form-image"} 
            onMouseOver={() => setIsImageLarge(true)}
            onMouseLeave={() => setIsImageLarge(false)} />


            <Form >
                <Form.Group controlId="marca">
                    <Form.Label><strong>Marca:</strong></Form.Label>
                    <Form.Control required minLength="2" value={data.marca} type="text" placeholder="Marca" />
                </Form.Group>
                <Form.Group controlId="genero">
                    <Form.Label><strong>Genero:</strong></Form.Label>
                    <Form.Control  as="select" id="genero" aria-label="Default select example" >
                        <option>Selecciona el Genero</option>
                        {genders.map(option => (
                        <option key={option._id} value={option.gender}>{option.gender}</option>
                        ))}
                    </Form.Control >
                </Form.Group>
                <Form.Group controlId="talla">
                    <Form.Label><strong>Talla:</strong></Form.Label>
                    <Form.Control as="select" id="talla"  aria-label="Default select example" >
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
                    <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="descripcion">
                    <Form.Label><strong>Descripcion:</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" value={data.descripcion} placeholder="Descripcion" />
                </Form.Group>

                <Form.Group controlId="cantidad">
                    <Form.Label><strong>Cantidad</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" value={data.cantidad} placeholder="Cantidad" />
                </Form.Group>

                <Form.Group controlId="precio">
                    <Form.Label><strong>Precio:</strong></Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" value={data.precio} />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                    <Button variant="primary" type="submit">
                        Modificar
                    </Button>   

            </Form>
        </div>
    )

}

export default withRouter(AgregarForm)
