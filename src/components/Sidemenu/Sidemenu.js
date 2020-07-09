import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {AuthHOC} from '../HOCs/AuthHOC'

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


// import './Sidemenu.scss'
// import Search from './Search'
class SideMenu extends Component {

    

    render() {
        const {user} = this.props
        return (


            // <SideNav
            //     onSelect={(selected) => {
            //         // Add your code here
            //     }}
            // >
            //     <SideNav.Toggle />
            //     <SideNav.Nav defaultSelected="home">
            //         <NavItem eventKey="home" onClick={this.props.history.push('/home')}>
            //             <NavIcon>
            //                 <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>
            //                 Home
            // </NavText>
            //         </NavItem>
            //         <NavItem eventKey="Services" onClick={this.props.history.push('/services')}>
            //             <NavIcon>
            //                 <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            //             </NavIcon>
            //             <NavText>
            //                 Services
            // </NavText>
            //             <NavItem eventKey="charts/linechart">
            //                 <NavText>
            //                     Line Chart
            //     </NavText>
            //             </NavItem>
            //             <NavItem eventKey="charts/barchart">
            //                 <NavText>
            //                     Bar Chart
            //     </NavText>
            //             </NavItem>
            //         </NavItem>
            //     </SideNav.Nav>
            // </SideNav>
            
            <div id="sidebar"  className="basic-sidebar-nav">
                <Link className="top" to={`/home`}>Home</Link>
                {/* <Link to={`/home`}>Home</Link> */}

                <br/>
                <Link to={`/services`}>Services</Link>
                <br/>
                <Link className="plus" to={`/gigs`}>Gigs</Link>
                <br/>
                <Link to={`/clients`}>Clients</Link>
                <br/>
                {/* <Link to={`/calendar`}>Calendar</Link> */}
                <br/>
            </div>
        )
    }
}


// export default AuthHOC(SideMenu)

export default SideMenu