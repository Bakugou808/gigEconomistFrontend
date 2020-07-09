import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteClient } from '../../actions/clientActions'
import ClientForm from './ClientForm'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


class ClientCard extends Component {

    state = {
        edit: false,
    }

    handleClick = () => {
        this.setState(prev => ({edit: !prev.edit}))
    }
    

    render() {
        const {client} = this.props
        const titleStyle = {
            "font-size": '23px',
        }
 
        const cardStyle = {
            "margin": '10px',
        }
 
        const descStyle = {
            "padding-top":'10px'
        }
        const payStyle = {
         "padding-top":'5px'
         }
        return (
        <div style={cardStyle}> 
            <Container>

                <Row >
                    <Col><div style={titleStyle} onClick={this.handleView} >{client.company_name}</div></Col>
                    <Col style={cardStyle}>{`Contact: ${client.contact_name}`}</Col>
                    <Col style={cardStyle}>{`Email: ${client.email}`}</Col>
                    <Col style={cardStyle}>{`Cell: ${client.cell}`}</Col>
                    <Col style={cardStyle}>{`Venmo: ${client.venmo}`}</Col>
                    
                    <Col  >
                        <Button variant='outline-warning' size='sm' onClick={this.handleClick}><BsPencilSquare/></Button>
                        <Button variant='outline-warning' size='sm' onClick={()=>this.props.onDeleteClient(client.id)}><BsFillTrashFill/></Button>
                    </Col>
                </Row>

            </Container>
            <div>
                {this.state.edit && <ClientForm client={client} handleClick={this.handleClick}/> }
            </div>
        </div>
        )
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClient: (client_id) => deleteClient(client_id, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(ClientCard)