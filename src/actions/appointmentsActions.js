import {headers} from '../services/api'
import {fetchServiceEarnedVsProj} from './statsActions'

export const fetchAppointmentsRequest = () => {
    return {
        type: 'FETCH_APPOINTMENTS_REQUEST'
    }
}

export const fetchAppointmentsSuccess = (appointments) => {
    return {
        type: 'FETCH_APPOINTMENTS_SUCCESS',
        appointments: appointments,
    }
}

export const fetchAppointmentsFailure = (error) => {
    return {
        type: 'FETCH_APPOINTMENTS_FAILURE',
        error: error,
    }
}
// ----------FETCH SINGLE APPOINTMENT REQUEST-------  *****************************


export const fetchAppointmentRequest = () => {
    return {
        type: 'FETCH_APPOINTMENT_REQUEST'
    }
}

export const fetchAppointmentSuccess = (appointment) => {
    return {
        type: 'FETCH_APPOINTMENT_SUCCESS',
        appointment: appointment,
    }
}

export const fetchAppointmentFailure = (error) => {
    return {
        type: 'FETCH_APPOINTMENT_FAILURE',
        error: error,
    }
}


// ----------POST APPOINTMENT REQUEST-------  *****************************

export const postAppointmentRequest = () => {
    return {
        type: 'POST_APPOINTMENT_REQUEST'
    }
}

export const postAppointmentSuccess = (appointment) => {
    return {
        type: 'POST_APPOINTMENT_SUCCESS',
        appointment: appointment,
    }
}

export const postAppointmentFailure = (error) => {
    return {
        type: 'POST_APPOINTMENT_FAILURE',
        error: error,
    }
}


// ----------PATCH APPOINTMENT REQUEST-------  *****************************

export const patchAppointmentRequest = () => {
    return {
        type: 'PATCH_APPOINTMENT_REQUEST'
    } 
}

export const patchAppointmentSuccess = (appointment) => {
    return {
        type: 'PATCH_APPOINTMENT_SUCCESS',
        appointment: appointment,
    }
}

export const patchAppointmentFailure = (error) => {
    return {
        type: 'PATCH_APPOINTMENT_FAILURE',
        error: error,
    }
}

// ----------DELETE APPOINTMENT REQUEST-------  *****************************

export const deleteAppointmentRequest = () => {
    return {
        type: 'DELETE_APPOINTMENT_REQUEST'
    }
}

export const deleteAppointmentSuccess = (appointmentId) => {
    return {
        type: 'DELETE_APPOINTMENT_SUCCESS',
        appointmentId: appointmentId,
    }
}

export const deleteAppointmentFailure = (error) => {
    return {
        type: 'DELETE_APPOINTMENT_FAILURE',
        error: error,
    }
}


// ----------SET APPOINTMENTS FOR GIG-------  *****************************

export const setAppointmentsForGig = (appointmentList) => {
    return {
        type: 'SET_APPOINTMENTS_FOR_SERVICE',
        appointmentList: appointmentList
    }    
}

// ----------SET APPOINTMENT FOR VIEW-------  *****************************

export const selectAppointment = (appointment) => {
    return {
        type: 'SET_APPOINTMENT_FOR_VIEW',
        appointment: appointment
    }
}

export const clearAppointmentsList = () => {
    console.log("in clear appnts")
    return {
        type: 'CLEAR_APPOINTMENTS_LIST'
    }
}



// --------API CALLS---------  *********************************************************************************************************************************


// --------FETCH ALL USER'S APPOINTMENTS---------  ********************************

export const fetchAppointments = (userId, dispatch) => {
        dispatch(fetchAppointmentsRequest())
        fetch(`http://localhost:3000/user_appointments/${userId}`)
            .then(res=>res.json())
            .then(data => {
                if (data.error){
                    dispatch(fetchAppointmentsFailure(data.error))
                } else {
                    dispatch(fetchAppointmentsSuccess(data))
                }
            }) 
}

// --------FETCH SINGLE APPOINTMENT---------  ********************************

export const fetchAppointment = (appointmentId, dispatch) => {
    dispatch(fetchAppointmentRequest())
    fetch(`http://localhost:3000/appointments/${appointmentId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchAppointmentFailure(data.error))
            } else {
                dispatch(fetchAppointmentSuccess(data))
            }
        }) 
}

// ----------POST APPOINTMENT-------  *****************************


export const postNewAppointment = (appointmentData, dispatch) => {
    dispatch(postAppointmentRequest())
    fetch(`http://localhost:3000/appointments`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(appointmentData)
    })
        .then(res=>res.json())
        .then(data => {
            
            if (data.error){
                console.log(data)
                dispatch(postAppointmentFailure(data.error))
            } else {
                console.log(data)

                dispatch(postAppointmentSuccess(data))
                // dispatch( )
            }
        }) 
}

// ----------PATCH APPOINTMENT-------  *****************************

export const patchAppointment = (appointmentData, appointmentId, dispatch, serviceID=null) => {
    dispatch(patchAppointmentRequest())
    fetch(`http://localhost:3000/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(appointmentData)
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(patchAppointmentFailure(data.error))
            } else {
                console.log(data)
                dispatch(patchAppointmentSuccess(data))
                
                serviceID && fetchServiceEarnedVsProj(serviceID, dispatch)
            }
        }) 
}


// --------DELETE APPOINTMENT---------  ********************************

export const deleteAppointment = (appointmentId, dispatch) => {
    dispatch(deleteAppointmentRequest())
    fetch(`http://localhost:3000/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: headers(),
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(deleteAppointmentFailure(data.error))
            } else {
                dispatch(deleteAppointmentSuccess(data))
            }
        }) 
}
