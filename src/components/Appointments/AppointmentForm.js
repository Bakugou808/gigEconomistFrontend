import React, { Component } from 'react'
import { connect } from 'react-redux'
import {postNewAppointment, patchAppointment} from '../../actions/appointmentsActions'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


class AppointmentForm extends Component {

    state = {
        edit: false,
        error: false,
        fields: {
            title: '',
            date_of_appointment: '', 
            payment_amount: '', 
            time_of_appointment: '',
            notes: '',
            location: '',
            end_of_appointment: '',
            gig_id: ''
        }
    }

    componentDidMount(){
        if(this.props.appointment){
            const {appointment} = this.props 
            this.setState({edit: true, fields: {
                title: appointment.title,
                date_of_appointment: appointment.date_of_appointment, 
                payment_amount: appointment.payment_amount, 
                time_of_appointment: appointment.time_of_appointment,
                notes: appointment.notes,
                location: appointment.location,
                end_of_appointment: appointment.end_of_appointment,
                gig_id: appointment.gig_id,
            }})
        }
    }

    handleChange = (e) => {
        
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value, gig_id: this.props.selectedGig.id };
        this.setState({fields: newFields})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.state.edit){
            this.props.onPostNewAppointment(this.state.fields)
            this.props.closeForm()
        } else {
            this.props.onPatchAppointment(this.state.fields, this.props.appointment.id)
            this.props.closeForm()

        }
        
    }

    render() {
        const {title, date_of_appointment, payment_amount, time_of_appointment, notes, location, end_of_appointment, gig_id} = this.props
        const formStyle = {
            'margin': '5px'
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row style={formStyle}> 
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' required onChange={this.handleChange} name='title' value={title} placeholder='Enter Title' />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPayment">
                            <Form.Label>Amount Due</Form.Label>
                            <Form.Control type='text' required onChange={this.handleChange} name='payment_amount' value={payment_amount} placeholder='Amount Due' />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type='text' required onChange={this.handleChange} name='location' value={location} placeholder='Enter Location (123 Olive Way, Apt 2, 02138 Seattle, WA)' />
                    </Form.Group>
                    <Form.Row style={formStyle}>
                        <Form.Group as={Col} controlId="formGridDate">
                            <Form.Label>Date of Appointment</Form.Label>
                            <Form.Control type='date' required onChange={this.handleChange} name='date_of_appointment' value={date_of_appointment} placeholder='Enter Date' />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTime">
                            <Form.Label>Start of Appointment</Form.Label>
                            <Form.Control type='time' required onChange={this.handleChange} name='time_of_appointment' value={time_of_appointment} placeholder='Enter Time' />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEndTime">
                            <Form.Label>End of Appointment</Form.Label>
                            <Form.Control type='time' required onChange={this.handleChange} name='end_of_appointment' value={end_of_appointment} placeholder='Hrs:Min' />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} controlId="FormGridNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type='text' onChange={this.handleChange} name='notes' value={notes} placeholder='Enter Notes' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        selectedGig: store.gigs.selectedGig,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostNewAppointment: (appointmentData) => postNewAppointment(appointmentData, dispatch),
        onPatchAppointment: (appointmentData, appointmentId) => patchAppointment(appointmentData, appointmentId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm)