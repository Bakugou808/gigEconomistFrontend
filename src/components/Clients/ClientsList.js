import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchClients } from '../../actions/clientActions'
import ClientCard from './ClientCard'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const user_id = localStorage.userId

class ClientsList extends Component {

    componentDidMount(){
        const {id} = this.props.user
        this.props.onFetchClients(user_id)
    }

    renderClients = () => {
        const {data} = this.props.clients
        const subCardStyle = {
            'width': '100%',
            'margin': '10px' 
        }
        return data.map(client => {
            return (
                <Card 
                    border='warning'
                    bg="info"
                    text={'info' === 'light' ? 'dark' : 'white'}
                    style={subCardStyle}
                >
                    <Card.Header><ClientCard client={client} /> </Card.Header>
                </Card>
            )
        } )
    }


    
 
    render() {

        const cardStyle = {
            'width': '100', 
            'height': 'auto', 
            'margin':'10px'
            // 'overflow-y': 'auto'
        }

        const containerStyle = {
            'width': 'auto', 
            'height': 'auto',
            'overflow-y': 'auto',
            'margin': '5px',
            '.scrollbar-width': 'thin',
            '.scrollbar-color': 'yellow'
        }

        const titleStyle = {
            "cursor": 'pointer'
        }

        return (
    

            <Accordion defaultActionKey="0">
                <Card
                    bg={'info'}
                    // key={service.id}
                    border='warning'
                    style={cardStyle}
                    text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                >
                    {/* <Card.Header> */}
                    <Accordion.Toggle as={Card.Header} eventKey='0' >
                        <Card.Title style={titleStyle}>View Clients </Card.Title>
                    </Accordion.Toggle>
                    {/* </Card.Header> */}
                    <Accordion.Collapse eventKey='0'>
                        <Container style={containerStyle}>
                            {this.props.clients.data && this.renderClients()}
                        </Container>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        clients: store.clients,
        user: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchClients: (user_id) => fetchClients(user_id, dispatch)
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ClientsList)