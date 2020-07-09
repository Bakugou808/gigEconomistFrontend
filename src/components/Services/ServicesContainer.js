import React, { Component } from 'react'
import { Route } from "react-router-dom";
import { connect } from 'react-redux'

import ServicesList from './ServicesList'
import GigsForService from '../Stats/GigsForService'
import { AuthHOC } from '../HOCs/AuthHOC'
import NewServiceForm from './NewServiceForm'
import ServiceCard from './ServiceCard'
import ServiceEarnedVsProjected from '../Stats/ServiceEarnedVsProjected'
import InfoCardGigsForService from '../Stats/InfoCardGigsForService'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'

import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import InfoCardEarnedVsProj from '../Stats/InfoCardEarnedVsProj';
import TaxesForService from '../Stats/TaxesForService';
import InfoCardTaxesForService from '../Stats/InfoCardTaxesForService';
import { clearServiceState } from '../../actions/statsActions'
import ServiceView from './ServiceView'



class ServicesContainer extends Component {

    state = {
        form: false,
    }

    handleClick = () => {
        this.setState(prev => ({ form: !prev.form }))
    }

    componentDidMount() {
        this.props.onClearStore()
    }


    render() {
        
        const {history, match, selectedService, earnedVsProjected} = this.props
        const subCardStyle = {
            'width': '100%',
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
            <Container>
                {/* current vs projected income */}
                <Row>
                    <Col >
                    <Accordion defaultActionKey="0">
                    <Card
                        bg={'info'}
                        // key={service.id}
                        border='warning'
                        style={subCardStyle}
                        text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    >
                        {/* <Card.Header> */}
                            <Accordion.Toggle as={Card.Header} eventKey='0' >
                                <Card.Title style={titleStyle}>Select A Service </Card.Title> 
                            </Accordion.Toggle>
                        {/* </Card.Header> */}
                        <Accordion.Collapse eventKey='0'>
                            <Container style={containerStyle}>
                            <ServicesList history={history} match={match} handleClick={this.handleClick} showForm={this.handleClick} earnedVsProjected={this.props.earnedVsProjected} /> 
                            </Container>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> 
                        {/* <ServicesList history={history} match={match} handleClick={this.handleClick} showForm={this.handleClick} earnedVsProjected={this.props.earnedVsProjected} /> */}
                    </Col>
                </Row>
                <Row>
                    <Col  >
                        <Button size='sm' variant='outline-warning' onClick={this.handleClick} >+</Button>
                        {this.props.selectedService.id && <Card border='warning' bg="info"
                            text={'info' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}><ServiceCard displayGigs={true} service={this.props.selectedService} match={match} history={history} /></Card>}
                    </Col>
                </Row>
                <div>
                    {this.state.form && <Modal show={this.state.form} onHide={this.handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>Service Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><NewServiceForm handleClick={this.handleClick} /></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClick}>Close</Button>
                        </Modal.Footer>
                    </Modal>} 
                </div>



                {/* {this.props.selectedService.id && <ServiceView />} */}


                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Gigs For Service</Card.Title><Card.Subtitle>This Months Analysis</Card.Subtitle>
                            </Card.Header>

                            <Card.Body >
                                <Row>
                                    <Col style={statStyle}>
                                        {selectedService.id && <GigsForService />}
                                    </Col>
                                    <Col style={statStyle}>
                                        {selectedService.id && <InfoCardGigsForService />}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* appointments this week --> Google Cal? */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Earned Vs. Projected</Card.Title></Card.Header>
                            <Card.Body >
                                <Row>
                                    <Col style={statStyle}>
                                        {selectedService.id && <ServiceEarnedVsProjected />}
                                    </Col>
                                    <Col style={statStyle}>
                                        {selectedService.id && <InfoCardEarnedVsProj />}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* most lucrative service */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Taxes For Service Thus Far</Card.Title></Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col style={statStyle}>
                                        {selectedService.id && <TaxesForService />}
                                    </Col>
                                    <Col style={statStyle}>
                                        {selectedService.id && <InfoCardTaxesForService />}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        selectedService: store.services.selectedService,
        earnedVsProjected: store.stats.serviceStats.earnedVsProjected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClearStore: () => dispatch(clearServiceState())
    }
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(ServicesContainer))