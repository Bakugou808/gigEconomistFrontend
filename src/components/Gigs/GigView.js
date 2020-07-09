import React, { Component } from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'

class GigView extends Component {

    // totalDue = () => {
    //     const {gigs} = this.props 
    //     let appts = []
    //     appts = gigs.map(gig => {
    //         return gig.appointments.map(appt=> parseInt(appt.payment_amount.split('$')[1]))
    //     })
    //     debugger
    // }

    totalDue = () => {
        const {gigs, gig} = this.props 
        let total = 0
        gigs.forEach(gigx => {
            gigx.title === gig.title && gigx.appointments.forEach(appt => total += parseInt(appt.payment_amount.split('$')[1]))
        })
        return total
    }
    

    render() { 
        const textStyle = {
            'margin': '10px'
        }
        const rowStyle = {
            'border-style': 'solid',
            'border-width': 'thin',
            'margin': '2px',
            'border-radius': '5px'
        }
        return (
            <Container>
                <Row style={rowStyle}>
                    <Col style={textStyle}>
                    Title: {this.props.gig.title}
                    </Col>
                    <Col style={textStyle}>
                    Total Payment Amount: ${this.totalDue()}
                    </Col>
                    <Col style={textStyle}>Completed: {this.props.gig.completed ? 'Yes' : 'Ongoing'}</Col>
                </Row>
                <Row style={rowStyle}>
                    <Col style={textStyle}>
                    {this.props.client && `Company: ${this.props.client.company_name}`}
                    </Col>
                    <Col style={textStyle}>Service Type: {this.props.gig.service_type}</Col>
                    <Col style={textStyle}>{this.props.client && `Venmo: ${this.props.client.venmo}`}</Col>
                </Row>
                <Row style={rowStyle}>
                    <Col style={textStyle}>{this.props.client && `Contact: ${this.props.client.contact_name}`}</Col>
                    <Col style={textStyle}>{this.props.client && `Email: ${this.props.client.email}`}</Col>
                    <Col style={textStyle}>{this.props.client && `Cell: ${this.props.client.cell}`}</Col>
                </Row>
                <Row style={rowStyle}><Col style={textStyle}>Details: {this.props.gig.details}</Col></Row>
            </Container>
            // <div>
            //     {`${this.props.gig.title}
            //     ${this.props.gig.service_type}
            //     ${this.props.client && this.props.client.company_name}
            //     ${this.props.client && this.props.client.contact_name}
            //     ${this.props.client && this.props.client.email}
            //     ${this.props.client && this.props.client.cell}
            //     ${this.props.client && this.props.client.venmo}
            //     payment amount:
            //     ${this.props.gig.completed}
            //     ${this.props.gig.details}`}

            // </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        gig: store.gigs.selectedGig,
        gigs: store.gigs.gigsForService,
        client: store.gigs.selectedGig.client
    }
}



export default connect(mapStateToProps)(GigView)