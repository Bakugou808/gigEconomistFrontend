import {headers} from '../services/api'

// ----------FETCH GIGS FOR THIS MONTH-------  *****************************

export const fetchServiceMonthsGigsRequest = () => {
    return {
        type: 'FETCH_MONTHS_GIGS_REQUEST'
    }
}

export const fetchServiceMonthsGigsSuccess = (gigs) => {
    return {
        type: 'FETCH_MONTHS_GIGS_SUCCESS',
        gigs: gigs,
    }
}

export const fetchServiceMonthsGigsFailure = (error) => {
    return {
        type: 'FETCH_MONTHS_GIGS_FAILURE',
        error: error,
    }
}

// ----------FETCH SERVICE EARNED VS PROJECTED REQUEST-------  *****************************

export const fetchServiceEarnedVsProjRequest = () => {
    return {
        type: 'FETCH_SERVICE_EARNED_VS_PROJECTED_REQUEST'
    }
}

export const fetchServiceEarnedVsProjSuccess = (results) => {
    return {
        type: 'FETCH_SERVICE_EARNED_VS_PROJECTED_SUCCESS',
        results: results,
    }
}

export const fetchServiceEarnedVsProjFailure = (error) => {
    return {
        type: 'FETCH_SERVICE_EARNED_VS_PROJECTED_FAILURE',
        error: error,
    } 
}

// // ----------Clear Services State-------  *****************************

export const clearServiceState = () => {
    return {
        type: 'CLEAR_SERVICE_STATE',
        state: []
    }
}




// ----------FETCH_TOTAL_CURRENT_VS_PROJECTED REQUEST-------  *****************************

export const fetchTotalCurrVsProjRequest = () => {
    return {
        type: 'FETCH_TOTAL_CURRENT_VS_PROJECTED_REQUEST'
    }
}

export const fetchTotalCurrVsProjSuccess = (data) => {
    return {
        type: 'FETCH_TOTAL_CURRENT_VS_PROJECTED_SUCCESS',
        payload: data,
    }
}

export const fetchTotalCurrVsProjFailure = (error) => {
    return {
        type: 'FETCH_TOTAL_CURRENT_VS_PROJECTED_FAILURE',
        error: error,
    }
}


// ----------FETCH_APPT_THIS_WEEK REQUEST-------  *****************************

export const fetchApptThisWeekRequest = () => {
    return {
        type: 'FETCH_APPT_THIS_WEEK_REQUEST'
    }
}

export const fetchApptThisWeekSuccess = (data) => {
    return {
        type: 'FETCH_APPT_THIS_WEEK_SUCCESS',
        payload: data,
    }
}

export const fetchApptThisWeekFailure = (error) => {
    return {
        type: 'FETCH_APPT_THIS_WEEK_FAILURE',
        error: error,
    }
}


// ----------FETCH MOST POP SERVICE THIS MONTH REQUEST-------  *****************************

export const fetchMostPopServiceRequest = () => {
    return {
        type: 'FETCH_MOST_POP_SERVICE_REQUEST'
    }
}

export const fetchMostPopServiceSuccess = (data) => {
    return {
        type: 'FETCH_MOST_POP_SERVICE_SUCCESS',
        payload: data,
    }
}

export const fetchMostPopServiceFailure = (error) => {
    return {
        type: 'FETCH_MOST_POP_SERVICE_FAILURE',
        error: error,
    }
}


// ----------FETCH MOST LUCRATIVE SERVICE THIS MONTH REQUEST-------  *****************************

export const fetchMostLucrativeServiceRequest = () => {
    return {
        type: 'FETCH_MOST_LUCRATIVE_SERVICE_REQUEST'
    }
}

export const fetchMostLucrativeServiceSuccess = (data) => {
    return {
        type: 'FETCH_MOST_LUCRATIVE_SERVICE_SUCCESS',
        payload: data,
    }
}

export const fetchMostLucrativeServiceFailure = (error) => {
    return {
        type: 'FETCH_MOST_LUCRATIVE_SERVICE_FAILURE',
        error: error,
    }
}

// ----------FETCH TOTAL STATS FROM THIS YEAR REQUEST-------  *****************************

export const fetchTotalAnnualStatsRequest = () => {
    return {
        type: 'FETCH_TOTAL_ANNUAL_STATS_REQUEST'
    }
}

export const fetchTotalAnnualStatsSuccess = (data) => {
    return {
        type: 'FETCH_TOTAL_ANNUAL_STATS_SUCCESS',
        payload: data,
    }
}

export const fetchTotalAnnualStatsFailure = (error) => {
    return {
        type: 'FETCH_TOTAL_ANNUAL_STATS_FAILURE',
        error: error,
    }
}

// ----------FETCH MOST TIME INTENSIVE FROM THIS YEAR REQUEST-------  *****************************

export const fetchTimeIntensiveServiceRequest = () => {
    return {
        type: 'FETCH_TIME_INTENSIVE_SERVICE_REQUEST'
    }
}

export const fetchTimeIntensiveServiceSuccess = (data) => {
    return {
        type: 'FETCH_TIME_INTENSIVE_SERVICE_SUCCESS',
        payload: data,
    }
}

export const fetchTimeIntensiveServiceFailure = (error) => {
    return {
        type: 'FETCH_TIME_INTENSIVE_SERVICE_FAILURE',
        error: error,
    }
}


// --------API CALLS---------  *********************************************************************************************************************************


// --------FETCH ALL SERVICES---------  ********************************

export const fetchServicesMonthsGigs = (serviceId, dispatch) => {
        dispatch(fetchServiceMonthsGigsRequest())
        fetch(`http://localhost:3000/months_gigs/${serviceId}`)
            .then(res=>res.json())
            .then(data => {
                if (data.error){
                    dispatch(fetchServiceMonthsGigsFailure(data.error))
                } else {
                    dispatch(fetchServiceMonthsGigsSuccess(data))
                }
            }) 
}

// --------FETCH SERVICE EARNED VS PROJECTED---------  ********************************

export const fetchServiceEarnedVsProj = (serviceId, dispatch) => {
    dispatch(fetchServiceEarnedVsProjRequest())
    fetch(`http://localhost:3000/earned_vs_projected/${serviceId}`)
        .then(res=>res.json())
        .then(data => { 
            if (data.error){
                dispatch(fetchServiceEarnedVsProjFailure(data.error))
            } else {
                dispatch(fetchServiceEarnedVsProjSuccess(data)) 
                
            }
        }) 
}

// --------FETCH TOTAL CURRENT VS PROJECTED---------  ********************************

export const fetchTotalCurrVsProj = (userId, dispatch) => {
    dispatch(fetchTotalCurrVsProjRequest())
    fetch(`http://localhost:3000/current_vs_projected_income/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchTotalCurrVsProjFailure(data.error))
            } else {
                dispatch(fetchTotalCurrVsProjSuccess(data)) 
            }
        }) 
}


// --------FETCH APPT THIS WEEK---------  ********************************

export const fetchApptThisWeek = (userId, dispatch) => {
    dispatch(fetchApptThisWeekRequest())
    fetch(`http://localhost:3000/appointments_this_week/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchApptThisWeekFailure(data.error))
            } else {
                dispatch(fetchApptThisWeekSuccess(data)) 
            }
        }) 
}


// --------FETCH MOST POP SERVICE THIS MONTH---------  ********************************

export const fetchMostPopService = (userId, dispatch) => {
    dispatch(fetchMostPopServiceRequest())
    fetch(`http://localhost:3000/most_pop_service/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchMostPopServiceFailure(data.error))
            } else {
                dispatch(fetchMostPopServiceSuccess(data)) 
            }
        }) 
}


// --------FETCH MOST LUCRATIVE SERVICE THIS MONTH---------  ********************************

export const fetchMostLucrativeService = (userId, dispatch) => {
    dispatch(fetchMostLucrativeServiceRequest())
    fetch(`http://localhost:3000/most_lucrative_service/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchMostLucrativeServiceFailure(data.error))
            } else {
                dispatch(fetchMostLucrativeServiceSuccess(data)) 
            }
        }) 
}

// --------FETCH TOTAL ANNUAL STATS---------  ********************************

export const fetchTotalAnnualStats = (userId, dispatch) => {
    dispatch(fetchTotalAnnualStatsRequest())
    fetch(`http://localhost:3000/total_annual_stats/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchTotalAnnualStatsFailure(data.error))
            } else {
                dispatch(fetchTotalAnnualStatsSuccess(data)) 
            }
        }) 
}

// --------FETCH TIME INTENSIVE SERVICE STATS---------  ********************************

export const fetchTimeIntensiveService = (userId, dispatch) => {
    dispatch(fetchTimeIntensiveServiceRequest())
    fetch(`http://localhost:3000/most_time_intensive_service/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchTimeIntensiveServiceFailure(data.error))
            } else {
                dispatch(fetchTimeIntensiveServiceSuccess(data)) 
            }
        }) 
}