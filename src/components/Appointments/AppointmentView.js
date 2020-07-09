 import React, { Component } from 'react'
 import {connect} from 'react-redux'
import { patchAppointment, deleteAppointment } from '../../actions/appointmentsActions'
import {fetchService} from '../../actions/serviceActions'

import AppointmentForm from './AppointmentForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BsPencilSquare, BsFillTrashFill, BsCheckBox } from 'react-icons/bs'
import {fetchServiceEarnedVsProj} from '../../actions/statsActions'



class AppointmentView extends Component {

   state = {
      edit: false,
   }

   handleEdit = () => {
      this.setState(prev => ({edit: !prev.edit}))
   }

   handleComplete = () => {
      const {onPatchAppointment, onFetchService, appointment, selectedService, onFetchServiceEarnedVsProj} = this.props
      let val = appointment.completed ? false : true 
      let fields = {title: appointment.title, payment_amount: appointment.payment_amount, notes: appointment.notes, location: appointment.location, gig_id: appointment.gig_id, end_of_appointment: appointment.end_of_appointment, time_of_appointment: appointment.time_of_appointment, completed: val}

      onPatchAppointment(fields, appointment.id, selectedService.id)
      onFetchService(selectedService.id)
      // onFetchServiceEarnedVsProj(selectedService.id)
   }
   
   renderDate = (created_at) => {
      let date = new Date(created_at).toLocaleDateString('en-GB', {  
          day : 'numeric',
          month : 'short',
          year : 'numeric'
      })
      return date 
  }

  renderTime = (timeST) => {
     let time = new Date(timeST)
     time = time.toLocaleTimeString()
     return time
  }

     render() {
         const {appointment, closeForm} = this.props
         const cardStyle = {
            "margin": '10px', 
        }
        const titleStyle = {
           "width": 'auto'
        }
        const textStyle = {
           'margin': '10px'
        }
         return (
             <div>
                 <Card bg={'info'}
                  // key={service.id}
                  border='warning'
                  style={cardStyle}
                  text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>
                    <Row border='warning'>
                    <Col style={textStyle} >
                        Title: {appointment.title}
                     </Col>
                     <Col style={textStyle}>
                        Date: {this.renderDate(appointment.date_of_appointment)}
                     </Col>
                     <Col style={textStyle}>
                        Paid: {appointment.completed ? "Paid" : "Not Paid"}
                     </Col>
                     <Col style={textStyle}>
                        Fee: {appointment.payment_amount}
                     </Col>
                     <Col style={textStyle}>
                        Time: {this.renderTime(appointment.time_of_appointment)} - {this.renderTime(appointment.end_of_appointment)}
                     </Col>
                     <Col style={textStyle}>
                        Location: {appointment.location}
                     </Col>
                     {/* <Col style={textStyle}>
                        {appointment.duration}
                     </Col> */}
                     <Col style={textStyle}>
                        <Row>
                        <Button variant='outline-warning' size='sm' onClick={this.handleEdit} ><BsPencilSquare/></Button>
                        <Button variant='outline-warning' size='sm' onClick={()=>this.props.onDeleteAppointment(appointment.id)}><BsFillTrashFill/></Button>
                        <Button variant='outline-warning' size='sm' onClick={this.handleComplete}><BsCheckBox/> </Button>
                        </Row>

                     </Col>
                    </Row>
                    <Row style={textStyle}>Note: {appointment.notes}</Row>
                    {this.state.edit && <AppointmentForm closeForm={this.handleEdit} appointment={appointment}/>}
                     
                 </Card >
             </div>
         )
     }
 }

 const mapStateToProps = (store) => {
   return {
       selectedService: store.services.selectedService,
   }
}
 
 const mapDispatchToProps= (dispatch) =>{
    return {
       onPatchAppointment: (appointmentData, appointmentId, serviceID) => patchAppointment(appointmentData, appointmentId, dispatch, serviceID),
       onDeleteAppointment: (appointmentId) => deleteAppointment(appointmentId, dispatch),
       onFetchService: (serviceId) => fetchService(serviceId, dispatch),
       onFetchServiceEarnedVsProj: (serviceId) => fetchServiceEarnedVsProj(serviceId, dispatch)
    }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(AppointmentView)