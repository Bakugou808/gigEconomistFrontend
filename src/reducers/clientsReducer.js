const initialState = {
    data: [],
    fetching: false,
    error: false,
}

const clientsReducer = (state=initialState, action) => {
    let idx 
    let data 

    switch(action.type){

        case 'FETCH_CLIENTS_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_CLIENTS_SUCCESS':
            
            return {
                ...state,
                fetching: false, 
                data: action.clients
            }    
        case 'FETCH_CLIENTS_FAILURE':
        
            return {
                ...state,
                fetching: false, 
                error: action.error
            } 

// ----------ADD SERVICE-------  *****************************

        case 'POST_CLIENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'POST_CLIENT_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'POST_CLIENT_SUCCESS':
        
            return {
                ...state,
                fetching: false, 
                data: [...state.data, action.client]
            } 
            
// ----------PATCH SERVICE-------  *****************************

        case 'PATCH_CLIENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'PATCH_CLIENT_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'PATCH_CLIENT_SUCCESS':
            // const newData = [state.data.filter(service => service.id != action.serviceId)]
            // idx = state.data.findIndex(service => service.id === action.service.id)
            
            return {
                ...state,
                fetching: false, 
                data: [...[...state.data.filter(client => client.id != action.client.id)], action.client]
            } 

// ----------DELETE SERVICE-------  *****************************

        case 'DELETE_CLIENT_REQUEST':
            return {
                ...state,
                fetching: true
            }
        case 'DELETE_CLIENT_FAILURE':

            return {
                ...state,
                fetching: false, 
                error: action.error
            } 
        case 'DELETE_CLIENT_SUCCESS':
        
            return {
                ...state,
                fetching: false, 
                data: state.data.filter(client => client.id != action.clientId)
            } 

        // case 'SIGN_OUT_USER':

        //     return {
        //         ...state,
        //         data: [],
        //     }

        default:
            return state
    }
}

export default clientsReducer