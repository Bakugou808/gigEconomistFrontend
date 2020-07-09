import {headers} from '../services/api'


export const fetchClientsRequest = () => {
    return {
        type: 'FETCH_CLIENTS_REQUEST'
    }
}

export const fetchClientsSuccess = (clients) => {
    return {
        type: 'FETCH_CLIENTS_SUCCESS',
        clients: clients,
    }
}

export const fetchClientsFailure = (error) => {
    return {
        type: 'FETCH_CLIENTS_FAILURE',
        error: error,
    }
}


// ----------POST CLIENT REQUEST-------  *****************************

export const postClientRequest = () => {
    return {
        type: 'POST_CLIENT_REQUEST'
    }
}

export const postClientSuccess = (client) => {
    return {
        type: 'POST_CLIENT_SUCCESS',
        client: client,
    }
}

export const postClientFailure = (error) => {
    return {
        type: 'POST_CLIENT_FAILURE',
        error: error,
    }
}


// ----------PATCH CLIENT REQUEST-------  *****************************

export const patchClientRequest = () => {
    return {
        type: 'PATCH_CLIENT_REQUEST'
    }
}

export const patchClientSuccess = (client) => {
    return {
        type: 'PATCH_CLIENT_SUCCESS',
        client: client,
    }
}

export const patchClientFailure = (error) => {
    return {
        type: 'PATCH_CLIENT_FAILURE',
        error: error,
    }
}

// ----------DELETE CLIENT REQUEST-------  *****************************

export const deleteClientRequest = () => {
    return {
        type: 'DELETE_CLIENT_REQUEST'
    }
}

export const deleteClientSuccess = (clientId) => {
    return {
        type: 'DELETE_CLIENT_SUCCESS',
        clientId: clientId,
    }
}

export const deleteClientFailure = (error) => {
    return {
        type: 'DELETE_CLIENT_FAILURE',
        error: error,
    }
}




// --------API CALLS---------  *********************************************************************************************************************************


// --------FETCH ALL CLIENTS---------  ********************************

export const fetchClients = (userId, dispatch) => {
    dispatch(fetchClientsRequest())
    fetch(`http://localhost:3000/user_clients/${userId}`)
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(fetchClientsFailure(data.error))
            } else {
                dispatch(fetchClientsSuccess(data))
            }
        }) 
}

// ----------ADD CLIENT-------  *****************************


export const postNewClient = (clientData, dispatch) => {
dispatch(postClientRequest())
fetch(`http://localhost:3000/clients`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(clientData)
})
    .then(res=>res.json())
    .then(data => {
        if (data.error){
            dispatch(postClientFailure(data.error))
        } else {
            dispatch(postClientSuccess(data))
        }
    }) 
}

// ----------PATCH CLIENT-------  *****************************

export const patchClient = (clientData, clientId, dispatch) => {
dispatch(patchClientRequest())
fetch(`http://localhost:3000/clients/${clientId}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(clientData)
})
    .then(res=>res.json())
    .then(data => {
        if (data.error){
            dispatch(patchClientFailure(data.error))
        } else {
            dispatch(patchClientSuccess(data))
        }
    }) 
}


// --------DELETE CLIENT---------  ********************************

export const deleteClient = (clientId, dispatch) => {
dispatch(deleteClientRequest())
fetch(`http://localhost:3000/clients/${clientId}`, {
    method: 'DELETE',
    headers: headers(),
})
    .then(res=>res.json())
    .then(data => {
        if (data.error){
            dispatch(deleteClientFailure(data.error))
        } else {
            dispatch(deleteClientSuccess(data.client_id))
        }
    }) 
}
