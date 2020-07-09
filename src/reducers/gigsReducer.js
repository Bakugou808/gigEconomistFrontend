const initialState = {
    allGigs: [],
    gigsForService: [], 
    selectedGig: [],
    fetching: false, 
    error: false,
}

const gigsReducer = (state=initialState, action) => {

    let idx 
    let data 

    switch(action.type){

        case 'FETCH_GIGS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_GIGS_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                allGigs: action.gigs
            }    
        case 'FETCH_GIGS_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 

// ----------ADD GIG-------  *****************************

        case 'POST_GIG_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_GIG_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'POST_GIG_SUCCESS':
        
            return {
                ...state,
                fetching: false, 
                allGigs: [...state.allGigs, action.gig],
                gigsForService: [...state.gigsForService, action.gig]
            } 
            
// ----------PATCH GIG-------  *****************************

        case 'PATCH_GIG_REQUEST':
            return { 
                ...state,
                fetching: true
            }
        case 'PATCH_GIG_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'PATCH_GIG_SUCCESS':
            // const newallGigs = [state.allGigs.filter(gig => gig.id != action.gigId)]
            idx = state.allGigs.findIndex(gig => gig.id === action.gig.id)
            
            return {
                ...state,
                fetching: false, 
                allGigs: [...[...state.allGigs.filter(gig => gig.id != action.gig.id)], action.gig],
                gigsForService: [...[...state.gigsForService.filter(gig => gig.id != action.gig.id)], action.gig]
            } 

// ----------DELETE GIG-------  *****************************

        case 'DELETE_GIG_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_GIG_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'DELETE_GIG_SUCCESS':
         
            return {
                ...state,
                fetching: false, 
                allGigs: state.allGigs.filter(gig => gig.id != action.gigId),
                gigsForService: state.gigsForService.filter(gig => gig.id != action.gigId)
            } 

// ----------SET GIGS FOR SERVICE-------  *****************************

        case 'SET_GIGS_FOR_SERVICE':

            return { 
                ...state,
                gigsForService: action.gigList
            } 

        case 'SET_GIG_FOR_VIEW':
            return {
                ...state,
                selectedGig: action.gig
            }
        
        case 'CLEAR_SERVICE_STATE':
            return {
                ...state,
                selectedGig: []
            }
        case 'CLEAR_GIG_LIST':
            return {
                ...state,
                gigsForService: []
            }
        
        case 'CLEAR_APPOINTMENTS_LIST':
            return {
                ...state,
                selectedGig: []
            }

        default:
            return state
    }

}

export default gigsReducer