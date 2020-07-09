import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import GigsList from '../Gigs/GigsList'
import GigView from '../Gigs/GigView'
import GigForm from '../Gigs/GigForm'
import AppointmentContainer from '../Appointments/AppointmentContainer'
import {fetchService} from '../../actions/serviceActions'


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
import { setGigsForService, patchGig } from '../../actions/gigActions'


class ServiceView extends Component {

    
    state = {
        new_gig: false,

    }
    
    componentDidMount(){
        const {match, onFetchService, onSetGigsForService, thisService} = this.props
        // let serviceId = match.params.serviceId
        let serviceId = thisService.id
        
        onFetchService(serviceId)
        // onSetGigsForService(thisService.gigs)

    }

    addGig = () => {
        this.setState(prev => ({new_gig: !prev.new_gig}))
    }

    totalTotalDue = () => {
        const {gigs} = this.props 
        let total = 0 
        let totalCount = 0


        let earned = 0
        let earnedCount = 0
        gigs.forEach(gig => {
            gig.appointments.forEach(appt => {
                if(appt.completed){
                    earned += parseInt(appt.payment_amount.split('$')[1])
                    earnedCount += 1
                }
                total += parseInt(appt.payment_amount.split('$')[1])
                totalCount += 1
            })
        })
        let data = {numAppts: totalCount, sum: total, earned: earned, earnedCount: earnedCount}
        return data
    }
    

    totalDue = () => {
        const {gigs, selectedGig} = this.props 
        let total = 0
        gigs.forEach(gigx => {
            gigx.title === selectedGig.title && gigx.appointments.forEach(appt => total += parseInt(appt.payment_amount.split('$')[1]))
        })
        return total
    }

    earned = () => {
        const {gigs, selectedGig} = this.props 
        let total = 0
        gigs.forEach(gigx => {
            gigx.title === selectedGig.title && gigx.appointments.forEach(appt => {
                if(appt.completed){total += parseInt(appt.payment_amount.split('$')[1])}
            })
        })
        return total
    }
    
    handleComplete = () => {
        const {selectedGig, onPatchGig, onFetchService, thisService} = this.props 
        const gigData = {completed: !selectedGig.completed}
        onPatchGig(gigData, selectedGig.id)
        onFetchService(thisService.id)

    }
    
    

    render() { 
        // const {service} = this.props.location.state
        const {thisService, selectedGig} = this.props
        const cardStyle = {
            "margin": '10px',
        }
        const gigListStyle = {
            "margin": '10px',
            'height': 'auto'
        }
        return (

            <Container>
                <Row>
                    <Col>
                        <Card
                            bg={'info'}
                            // key={service.id}
                            border='warning'
                            style={gigListStyle}
                            text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                        >
                            <GigsList gigs={this.props.gigs} service={thisService} />
                        </Card>
                        
                    </Col>
                    {/* <Col>
                        <Card bg={'warning'}
                            // key={service.id}
                            border='info'
                            style={gigListStyle}
                            text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>
                            <Card.Text style={cardStyle}>Total Earnings For {thisService.title} to Date: ${this.totalTotalDue().earned}</Card.Text>
                            <Card.Text style={cardStyle}>Projected Earnings For {thisService.title}: ${this.totalTotalDue().sum}</Card.Text>
                            <Card.Text style={cardStyle}>You've Completed {this.totalTotalDue().earnedCount} Appointments out of {this.totalTotalDue().numAppts}</Card.Text>
                        </Card>
                    </Col> */}
                </Row>
                <Row>
                    <Col md={12}>
                    <Button style={cardStyle} variant='info' onClick={this.addGig}>+</Button>

                    {selectedGig.title && <Card 
                            bg={'info'}
                            // key={service.id}
                            border='warning'
                            style={cardStyle}
                            text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                        >
                            <Card.Header>
                                <Container>
                                    <Row>
                                    <Col><Card.Title>{selectedGig.title}</Card.Title></Col>
                                    <Col>Client: {selectedGig.client && selectedGig.client.company_name}</Col>
                                    <Col>Contact: {selectedGig.client && selectedGig.client.contact_name}</Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                        </Card>}
                    </Col>

                </Row>
                <Row> 
                    <Container>
                        <Row>
                            <Col md={12}>
                            {selectedGig.title && <Card
                                    bg={'info'}
                                    // key={service.id}
                                    border='warning'
                                    style={cardStyle}
                                    text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                                >
                                     <Row>
                                        <Col md={9}>
                                            <Card.Body><GigView /></Card.Body> 
                                        </Col>
                                        <Col>
                                            <Card bg={'warning'}
                                                // key={service.id}
                                                border='info'
                                                style={cardStyle}
                                                text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>
                                                <Card.Text style={cardStyle}>Total Earnings For {selectedGig.title} to Date: ${this.earned()}</Card.Text>
                                                <Card.Text style={cardStyle}>Projected Earnings For {selectedGig.title}: ${this.totalDue()}</Card.Text>
                                            </Card>
                                            <Button style={cardStyle} variant='outline-warning' size='sm' onClick={this.handleComplete}>
                                                {selectedGig.completed ? `Mark Incomplete` : `Mark Completed`}
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                            <Col>
                                                <Card
                                                    bg={'info'}
                                                    // key={service.id}
                                                    border='warning'
                                                    style={cardStyle}
                                                    text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                                                >
                                                    <AppointmentContainer />
                                                </Card>
                                            </Col>
                                        </Row>
                                </Card>}
                            </Col>
                        </Row>
                    </Container>
                    

                    <Modal show={this.state.new_gig} onHide={this.addGig}> 
                        <Modal.Header closeButton>
                            <Modal.Title>Gig Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <GigForm closeForm={this.addGig} service={thisService} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.addGig}>
                                Close
                            </Button>
                            {/* <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button> */}
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = (store) => {
    return { 
        services: store.services,
        thisService: store.services.selectedService,
        gigs: store.gigs.gigsForService,
        selectedGig: store.gigs.selectedGig,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchService: (serviceId) => fetchService(serviceId, dispatch),
        onSetGigsForService: (gigList) => dispatch(setGigsForService(gigList)),
        onPatchGig: (gigData, gigId) => patchGig(gigData, gigId, dispatch)
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(ServiceView))
