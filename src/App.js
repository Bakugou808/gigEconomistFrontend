import React from 'react';
import './App.css'
import { Route } from "react-router-dom";
// import Container from 'react-bootstrap/Container'


import Landingpage from './components/LandingPage/LandingPage'
import Homepage from './components/Homepage/Homepage'
import NavBar from './components/NavBar/NavBar'
import ServicesContainer from '../src/components/Services/ServicesContainer'
import GigsContainer from '../src/components/Gigs/GigsContainer'
import ClientsContainer from '../src/components/Clients/ClientsContainer'
import Sidemenu from '../src/components/Sidemenu/Sidemenu'
import { fetchCurrentUser } from '../src/actions/authActions'
import { connect } from 'react-redux';
import ServiceView from '../src/components/Services/ServiceView'

import { fetchClients } from './actions/clientActions'
import { fetchServices } from './actions/serviceActions'

const user_id = localStorage.userId

class App extends React.Component {

  componentDidMount(){
    this.props.onFetchClients(user_id)
    this.props.onFetchServices(user_id)

  }

  render() {
    const {auth} = this.props
    return (
      <div>
          <Route path="/" render={props => <NavBar {...props} /> } />
          <Route exact path="/" render={props => <Landingpage {...props} /> } />
          {/* {auth && <Route path='/' render={props=> <Sidemenu {...props} />} />} */}

          <Route exact path='/home' render={props => <Homepage {...props} />}/>
          <Route path='/gigs' render={props => <GigsContainer {...props} />} />
          <Route path='/clients' render={props => <ClientsContainer {...props} />} />
          <Route exact path='/services' render={props => <ServicesContainer {...props} />} /> 
          <Route path={`/services/:serviceId`} render={props => <ServiceView {...props} />} />
          
          {/* <Route path="/" render={props => <NavBar {...props} /> } />
          {user && <Route path='/' render={props=> <Sidemenu {...props} />} />}
          
          <Route exact path='/home' render={props => <Homepage {...props} />}/>
          sidemenu routes
          <Route path='/gigs' render={props => <GigsContainer {...props} />} />
          <Route path='/clients' render={props => <ClientsContainer {...props} />} />
          <Route path='/services' render={props => <ServicesContainer {...props} />} /> */}
          
            
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return {
      user: state.user.data,
      auth: state.authorized.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchClients: (userId) => fetchClients(userId, dispatch),
    onFetchServices: (userId) => fetchServices(userId, dispatch)
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default AuthHOC(App)

