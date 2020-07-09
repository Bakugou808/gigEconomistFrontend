const initialState = {
    data: [],
    fetching: false,
    error: false,
    serviceStats: {
        gigsThisMonth:[], 
        earnedVsProjected: [],  
        avgMonthly: [],
    },
    currentVsProj: {},
    apptThisWeek: [],
    mostPopService: [],
    mostLucService: [],
    mostTimeIntServ: [],
    totalAnnualStats: [],

}

const servicesReducer = (state=initialState, action) => {
    let idx 
    let data 

    switch(action.type){

        case 'FETCH_MONTHS_GIGS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_MONTHS_GIGS_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                serviceStats: {...state.serviceStats, gigsThisMonth: action.gigs}
            }    
        case 'FETCH_MONTHS_GIGS_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
// ----------- FETCH EARNED_VS_PROJECTED ---------------- **********************
        case 'FETCH_SERVICE_EARNED_VS_PROJECTED_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_SERVICE_EARNED_VS_PROJECTED_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                serviceStats:{...state.serviceStats, earnedVsProjected: action.results} 
            }    
        case 'FETCH_SERVICE_EARNED_VS_PROJECTED_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 

// // ----------CLEAR SERVICE STATE-------  *****************************
        case 'CLEAR_SERVICE_STATE':
            console.log("in clear service state")
            return {
                ...state, 
                serviceStats: {avgMonthly: [], earnedVsProjected: [], gigsThisMonth: []},
            }

// ----------FETCH CURRENT VS PROJECTED TOTAL INCOME-------  *****************************

        case 'FETCH_TOTAL_CURRENT_VS_PROJECTED_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_TOTAL_CURRENT_VS_PROJECTED_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'FETCH_TOTAL_CURRENT_VS_PROJECTED_SUCCESS':
        
            return {
                ...state,
                fetching: false, 
                currentVsProj: action.payload
            } 


// ----------FETCH APPT THIS WEEK-------  *****************************

        case 'FETCH_APPT_THIS_WEEK_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_APPT_THIS_WEEK_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'FETCH_APPT_THIS_WEEK_SUCCESS':

            return {
                ...state,
                fetching: false, 
                apptThisWeek: action.payload
            }             
            

// ----------FETCH MOST POP SERVICE THIS MONTH-------  *****************************

        case 'FETCH_MOST_POP_SERVICE_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_MOST_POP_SERVICE_FAILURE': 

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'FETCH_MOST_POP_SERVICE_SUCCESS':

            return {
                ...state,
                fetching: false, 
                mostPopService: action.payload
            }             
            
// ----------FETCH MOST LUCRATIVE SERVICE THIS MONTH-------  *****************************

        case 'FETCH_MOST_LUCRATIVE_SERVICE_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_MOST_LUCRATIVE_SERVICE_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'FETCH_MOST_LUCRATIVE_SERVICE_SUCCESS':

            return {
                ...state,
                fetching: false, 
                mostLucService: action.payload
            }             
            

// ----------FETCH TIME INTENSIVE SERVICE-------  *****************************

        case 'FETCH_TIME_INTENSIVE_SERVICE_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_TIME_INTENSIVE_SERVICE_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'FETCH_TIME_INTENSIVE_SERVICE_SUCCESS':

            return {
                ...state,
                fetching: false, 
                mostTimeIntServ: action.payload
            }   



// ----------FETCH TOTAL ANNUAL STATS-------  *****************************

        case 'FETCH_TOTAL_ANNUAL_STATS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_TOTAL_ANNUAL_STATS_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'FETCH_TOTAL_ANNUAL_STATS_SUCCESS':

            return {
                ...state,
                fetching: false, 
                totalAnnualStats: action.payload
            }   


        default:
            return state
    }
}

export default servicesReducer