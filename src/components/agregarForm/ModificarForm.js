//import the boostrap compents we will be using on this form
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function AgregarForm({  handleSubmit}) {

    return (
        <div className="AgregarForm container">

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="marca">
                    <Form.Label><strong>Marca:</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" placeholder="Marca" />
                </Form.Group>
                <Form.Group controlId="genero">
                    <Form.Label><strong>Genero:</strong></Form.Label>
                    <Form.Control  as="select" id="genero" aria-label="Default select example" >
                        <option>Selecciona el Genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
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
                    <Form.Control required minLength="2"  type="text" placeholder="Descripcion" />
                </Form.Group>

                <Form.Group controlId="cantidad">
                    <Form.Label><strong>Cantidad</strong></Form.Label>
                    <Form.Control required minLength="2"  type="text" placeholder="Cantidad" />
                </Form.Group>

                <Form.Group controlId="precio">
                    <Form.Label><strong>Precio:</strong></Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" />
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

export default AgregarForm
