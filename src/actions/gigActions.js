import {headers} from '../services/api'

export const fetchGigsRequest = () => {
    return {
        type: 'FETCH_GIGS_REQUEST'
    }
}

export const fetchGigsSuccess = (gigs) => {
    return {
        type: 'FETCH_GIGS_SUCCESS',
        gigs: gigs,
    }
}

export const fetchGigsFailure = (error) => {
    return {
        type: 'FETCH_GIGS_FAILURE',
        error: error,
    }
}


// ----------POST GIG REQUEST-------  *****************************

export const postGigRequest = () => {
    return {
        type: 'POST_GIG_REQUEST'
    }
}

export const postGigSuccess = (gig) => {
    return {
        type: 'POST_GIG_SUCCESS',
        gig: gig,
    }
}

export const postGigFailure = (error) => {
    return {
        type: 'POST_GIG_FAILURE',
        error: error,
    }
}


// ----------PATCH GIG REQUEST-------  *****************************

export const patchGigRequest = () => {
    return {
        type: 'PATCH_GIG_REQUEST'
    }
}

export const patchGigSuccess = (gig) => {
    return {
        type: 'PATCH_GIG_SUCCESS',
        gig: gig,
    }
}

export const patchGigFailure = (error) => {
    return {
        type: 'PATCH_GIG_FAILURE',
        error: error,
    }
}

// ----------DELETE GIG REQUEST-------  *****************************

export const deleteGigRequest = () => {
    return {
        type: 'DELETE_GIG_REQUEST'
    }
}

export const deleteGigSuccess = (gigId) => {
    return {
        type: 'DELETE_GIG_SUCCESS',
        gigId: gigId,
    }
}

export const deleteGigFailure = (error) => {
    return {
        type: 'DELETE_GIG_FAILURE',
        error: error,
    }
}


// ----------SET GIGS FOR SERVICE-------  *****************************

export const setGigsForService = (gigList) => {
    return {
        type: 'SET_GIGS_FOR_SERVICE',
        gigList: gigList 
    }    
}

// ----------SET GIG FOR VIEW-------  *****************************

export const selectGig = (gig) => {
    return {
        type: 'SET_GIG_FOR_VIEW', 
        gig: gig
    }
}

export const clearGigList = () => {
    return {
        type: 'CLEAR_GIG_LIST'
    }
}




// --------API CALLS---------  *********************************************************************************************************************************


// --------FETCH ALL GIGS---------  ********************************

export const fetchGigs = (userId, dispatch) => {
        dispatch(fetchGigsRequest())
        fetch(`http://localhost:3000/user_gigs/${userId}`)
            .then(res=>res.json())
            .then(data => {
                if (data.error){
                    dispatch(fetchGigsFailure(data.error))
                } else {
                    dispatch(fetchGigsSuccess(data))
                }
            }) 
}

// ----------ADD GIG-------  *****************************


export const postNewGig = (gigData, dispatch) => {
    dispatch(postGigRequest())
    fetch(`http://localhost:3000/gigs`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(gigData)
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                console.log(data)
                dispatch(postGigFailure(data.error))
            } else {
                console.log(data)

                dispatch(postGigSuccess(data))
            }
        }) 
}

// ----------PATCH GIG-------  *****************************

export const patchGig = (gigData, gigId, dispatch) => {
    dispatch(patchGigRequest())
    fetch(`http://localhost:3000/gigs/${gigId}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(gigData)
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(patchGigFailure(data.error))
            } else {
                dispatch(patchGigSuccess(data))
                dispatch(selectGig(data))
            }
        }) 
}


// --------DELETE GIG---------  ********************************

export const deleteGig = (gigId, dispatch) => {
    dispatch(deleteGigRequest())
    console.log(gigId)
    fetch(`http://localhost:3000/gigs/${gigId}`, {
        method: 'DELETE',
        headers: headers(),
    })
        .then(res=>res.json())
        .then(data => {
            if (data.error){
                dispatch(deleteGigFailure(data.error))
            } else {
                console.log('indelete success')
                dispatch(deleteGigSuccess(data))
            }
        }) 
}
