import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function AgregarForm({ handleSubmit }) {

  //state={ gender: null }

  //handleChange = (e) => this.setState({gender: e.target.value})


  return (
    <div className="AgregarForm container">
      <Form onSubmit={handleSubmit} id="myForm">
        <Form.Group>
          <Form.Label>Género</Form.Label>
          <Form.Control type="text" placeholder="Type género" />
        </Form.Group>
      </Form>
    </div>
  )
}
export default AgregarForm