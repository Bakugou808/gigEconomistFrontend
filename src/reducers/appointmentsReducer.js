const initialState = {
    allAppointments:[],
    appointmentsForGig: [], 
    selectedAppointment: [],
    fetching: false, 
    error: false,
}

const appointmentsReducer = (state=initialState, action) => {

    let idx 
    let data 

    switch(action.type){

        case 'FETCH_APPOINTMENTS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_APPOINTMENTS_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                allAppointments: action.appointments
            }    
        case 'FETCH_APPOINTMENTS_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
// ----------FETCH SINGLE APPOINTMENT-------  *****************************


        case 'FETCH_APPOINTMENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_APPOINTMENT_SUCCESS':
            
            return {
                ...state, 
                fetching: false, 
                selectedAppointment: action.appointment
            }    
        case 'FETCH_APPOINTMENT_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 

// ----------POST APPOINTMENT-------  *****************************

        case 'POST_APPOINTMENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_APPOINTMENT_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'POST_APPOINTMENT_SUCCESS':
        
            return {
                ...state,
                fetching: false, 
                allAppointments: [...state.allAppointments, action.appointment],
                appointmentsForGig: {incomplete: [...state.appointmentsForGig.incomplete, action.appointment], completed: [...state.appointmentsForGig.completed]}
            } 
            
// ----------PATCH APPOINTMENT-------  *****************************

        case 'PATCH_APPOINTMENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_APPOINTMENT_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'PATCH_APPOINTMENT_SUCCESS':
            // const newallAppointments = [state.allAppointments.filter(gig => gig.id != action.gigId)]
            idx = state.allAppointments.findIndex(appointment => appointment.id === action.appointment.id)
            if(action.appointment.completed){
                return {
                    ...state,
                    fetching: false, 
                    allAppointments: [...[...state.allAppointments.filter(appointment => appointment.id != action.appointment.id)], action.appointment],
                    appointmentsForGig: {incomplete: [...state.appointmentsForGig.incomplete.filter(appt => appt.id != action.appointment.id)], completed: [...[...state.appointmentsForGig.completed.filter(appt=> appt.id != action.appointment.id)], action.appointment]}
                } 
            }else{
                return {
                    ...state,
                    fetching: false, 
                    allAppointments: [...[...state.allAppointments.filter(appointment => appointment.id != action.appointment.id)], action.appointment],
                    appointmentsForGig: {completed: [...state.appointmentsForGig.completed.filter(appt => appt.id != action.appointment.id)], incomplete: [...[...state.appointmentsForGig.incomplete], action.appointment]}
                } 
            }
            // return {
            //     ...state,
            //     fetching: false, 
            //     allAppointments: [...[...state.allAppointments.filter(appointment => appointment.id != action.appointment.id)], action.appointment],
            //     appointmentsForGig: [...[...state.appointmentsForGig.filter(appointment => appointment.id != action.appointment.id)], action.appointment]
            // } 

// ----------DELETE APPOINTMENT-------  *****************************

        case 'DELETE_APPOINTMENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_APPOINTMENT_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'DELETE_APPOINTMENT_SUCCESS':
        
            return {
                ...state,
                fetching: false, 
                allAppointments: state.allAppointments.filter(appt => appt.id != action.appointmentId),
                appointmentsForGig: {completed: [...state.appointmentsForGig.completed.filter(appt => appt.id != action.appointmentId)], incomplete: [...state.appointmentsForGig.incomplete.filter(appt => appt.id != action.appointmentId)]}
            } 

// ----------SET APPOINTMENTS FOR GIG-------  *****************************

        case 'SET_GIG_FOR_VIEW':
            console.log('in set appointments for gig',action.gig)
            let completedAppts = [] 
            let incompleteAppts = []
            action.gig.appointments.forEach(appt => appt.completed ? completedAppts.push(appt) : incompleteAppts.push(appt))
            
            return {
                ...state,
                appointmentsForGig: {incomplete: incompleteAppts, completed: completedAppts}
            }
 
        case 'SET_APPOINTMENT_FOR_VIEW':
            return {
                ...state,
                selectedAppointment: action.appointment
            }

        case 'CLEAR_SERVICE_STATE':
            return {
                ...state,
                appointmentsForGig: []
            }
        
        case 'CLEAR_APPOINTMENTS_LIST':
            return {
                ...state,
                appointmentsForGig: []
            }

        default:
            return state
    }

}

export default appointmentsReducer