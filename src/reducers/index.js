import { combineReducers } from 'redux';
import servicesReducer from './servicesReducer';
import userReducer from './userReducer'
import authReducer from './authReducer'
import clientsReducer from './clientsReducer'
import gigsReducer from './gigsReducer'
import appointmentsReducer from './appointmentsReducer'
import statsReducer from './statsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    authorized: authReducer,
    services: servicesReducer,
    clients: clientsReducer,
    gigs: gigsReducer,
    appointments: appointmentsReducer,
    stats: statsReducer
    // home: homeReducer
});
 
export default rootReducer