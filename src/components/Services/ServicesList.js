import React, { Component } from 'react'
import { connect } from 'react-redux'
import ServiceCard from './ServiceCard'
import { fetchServices } from '../../actions/serviceActions'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'



const userId = localStorage.userId

class ServicesList extends Component {

    componentDidMount(){
        this.props.onFetchServices(userId)
    }
    

    renderServices = () => {
        const {match, history} = this.props

        const subCardStyle = {
            'width': '96%',
            'margin': '20px' 
        }


        return this.props.services.data.map(service => { 
            return (
                <Card 
                    border='warning'
                    bg="info"
                    text={'info' === 'light' ? 'dark' : 'white'}
                    style={subCardStyle}
                >
                    <Card.Header><ServiceCard service={service} match={match} history={history} /></Card.Header>
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
            // 'width': 'inherit', 
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
           
                // <Accordion defaultActionKey="0">
                //     <Card
                //         bg={'info'}
                //         // key={service.id}
                //         border='warning'
                //         style={cardStyle}
                //         text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                //     >
                //         {/* <Card.Header> */}
                //             <Accordion.Toggle as={Card.Header} eventKey='0' >
                //                 <Card.Title style={titleStyle}>Select A Service </Card.Title> 
                //             </Accordion.Toggle>
                //         {/* </Card.Header> */}
                //         <Accordion.Collapse eventKey='0'>
                //             <Container style={containerStyle}>
                                <div>{this.props.services.data && this.renderServices()}</div>
                //             </Container>
                //         </Accordion.Collapse>
                //     </Card>
                // </Accordion>    
            
        )
    }
}

const mapStateToProps = (state) => {
    return { services: state.services}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchServices: (userId) => fetchServices(userId, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicesList)