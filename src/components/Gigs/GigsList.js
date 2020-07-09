import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectGig, setGigsForService, deleteGig, patchGig, clearGigList } from '../../actions/gigActions'
import GigCard from './GigCard'
import { AuthHOC } from '../HOCs/AuthHOC'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'

class GigsList extends Component {

    state = {
        edit: false,
    }

    componentDidMount() {
        const { onSetGigsForService } = this.props
        onSetGigsForService(this.props.gigs)
    }


    renderGigs = () => {
        const { gigList } = this.props


        return gigList.map(gig => <GigCard gig={gig} />)
    }

    totalTotalDue = () => {
        const { gigs } = this.props
        let total = 0
        let totalCount = 0


        let earned = 0
        let earnedCount = 0
        gigs.forEach(gig => {
            gig.appointments.forEach(appt => {
                if (appt.completed) {
                    earned += parseInt(appt.payment_amount.split('$')[1])
                    earnedCount += 1
                }
                total += parseInt(appt.payment_amount.split('$')[1])
                totalCount += 1
            })
        })
        let data = { numAppts: totalCount, sum: total, earned: earned, earnedCount: earnedCount }
        return data
    }


    render() {
        const cardStyle = {
            'width': 'flex',
            'height': 'auto',
            'margin': '10px'
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
            "cursor": 'pointer',
            'width': '100%'
        }
        const gigListStyle = {
            "margin": '10px',
            'height': 'auto',
            "width": "100%",
            "font-size": '17px'
        }

        const { thisService } = this.props
        return (
            <div>
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
                            
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title style={titleStyle}>
                                            <br />
                                            <br />
                                            Gigs for {this.props.service.title}
                                        </Card.Title>
                                    </Col>
                                    <Col md={{span: 8}}>
                                        <Card.Title style={titleStyle}>

                                            <Card bg={'warning'}
                                                // key={service.id}
                                                border='info'
                                                style={gigListStyle}
                                                text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>
                                                <Card.Text style={cardStyle}>Total Earnings For {thisService.title} to Date: ${this.totalTotalDue().earned}</Card.Text>
                                                <Card.Text style={cardStyle}>Projected Earnings For {thisService.title}: ${this.totalTotalDue().sum}</Card.Text>
                                                <Card.Text style={cardStyle}>You've Completed {this.totalTotalDue().earnedCount} Appointments out of {this.totalTotalDue().numAppts}</Card.Text>
                                            </Card>
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Accordion.Toggle>
                        {/* </Card.Header> */}
                        <Accordion.Collapse eventKey='0'>
                            <Container style={containerStyle}>
                                {this.renderGigs()}
                            </Container>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div >
        )
    }
}

const mapStateToProps = (store) => {
    return {
        gigList: store.gigs.gigsForService,
        selectedGig: store.gigs.selectedGig,
        thisService: store.services.selectedService,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectGig: (gig) => dispatch(selectGig(gig)),
        onSetGigsForService: (gigs) => dispatch(setGigsForService(gigs)),
        onDeleteGig: (gigId) => deleteGig(gigId, dispatch),
        onPatchGig: (gigData, gigId) => patchGig(gigData, gigId, dispatch),
        onClearGigList: () => clearGigList()
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(GigsList))