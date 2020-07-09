import React, { Component } from 'react'
import { AuthHOC } from '../HOCs/AuthHOC'
import ClientsList from './ClientsList'
import ClientForm from './ClientForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
class ClientsContainer extends Component {

    state = {
        addClient: false,
    }

    addClient = () => {
        this.setState(prev => ({addClient: !prev.addClient}))
    }
    

    render() {
        const subCardStyle = {
            'width': '100',
            'margin': '10px'
        }
        const cardStyle = {
            "margin": '10px',
        }

        const statStyle = {
            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': '100%',
            'height': '100%',
            'margin': '10px'
        }
        return (
            <Container>
                <Col>
                    <Button size='sm' variant='outline-warning' onClick={this.addClient}>+</Button>
                    <ClientsList showForm={this.addClient}/>
                </Col>
                
                <div>
                    {this.state.addClient && <Modal show={this.state.addClient} onHide={this.addClient}>
                        <Modal.Header closeButton>
                            <Modal.Title>Service Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><ClientForm handleClick={this.addClient} /></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.addClient}>Close</Button>
                        </Modal.Footer>
                    </Modal>}
                </div>
            </Container>

        )
    }
}

export default AuthHOC(ClientsContainer)