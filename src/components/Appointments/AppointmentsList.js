 import React, { Component, Fragment } from 'react'
import AppointmentView from './AppointmentView'
 import { connect } from 'react-redux'
import { AuthHOC } from '../HOCs/AuthHOC'
import { clearAppointmentsList } from '../../actions/appointmentsActions'

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

 
class AppointmentsList extends Component {

    componentDidMount() {
        this.props.onClearAppointments()
    }

    renderCompletedAppointments = () => {
        const {appointments, closeForm} = this.props
        return appointments.completed.map(appointment => <AppointmentView  appointment={appointment}/>)
    }
    
    renderIncompleteAppointments = () => {
        const {appointments, closeForm} = this.props
        return appointments.incomplete.map(appointment => <AppointmentView  appointment={appointment}/>)
    }

     render() {
         const {appointments} = this.props
         return (
             <div>
                 {appointments !== [] && 
                 <Fragment>
                 {appointments.incomplete && this.renderIncompleteAppointments()}
                 {appointments.completed && this.renderCompletedAppointments()}
                 </Fragment>
                 }
                 {appointments === [] && 
                 null}
             </div>
         )
     }
 }

 const mapStateToProps = (store) => {
     return {
         appointments: store.appointments.appointmentsForGig
     }
 }

 const mapDispatchToProps = (store) => {
    return {
        onClearAppointments: () => clearAppointmentsList()
    }
}
 
 export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsList)