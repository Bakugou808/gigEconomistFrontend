import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux';

import { signOutUser } from '../../actions/userActions'
import { AuthHOC } from '../HOCs/AuthHOC'




const Styles = styled.div`
    .navbar {
        background-color: lightblue;
        padding-bottom: 10px;
    }

    .nav-item {
        color: white;
        &:hover {
            color: indigo;
            cursor: pointer;
        }
    }

    
`


class NavBar extends Component {


    onLogout = () => {
        const { onSignOutUser, user } = this.props
        onSignOutUser(user.id)
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.props.history.push("/")
    }

    renderBar = () => {
        if (this.props.auth) {
            return (
                <Styles>
                    {/* <Navbar expand="lg">
                    <Nav.Brand className="navbar-item">{this.props.user.username}</Nav.Brand>
                    <Nav.Item className="navbar-item" href='/'>The GigEconomist</Nav.Item>
                    {this.props.user.username && <Nav.Item onClick={this.onLogout} className="navbar-item">Sign Out</Nav.Item>}
                </Navbar> */}

                    <Navbar className='navbar' expand="lg">
                        <Navbar.Brand >The Gig-Economist</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/services">Services</Nav.Link>
                                <Nav.Link href="/clients">Clients</Nav.Link>
                                <Nav.Link onClick={this.onLogout} className="navbar-item">Sign Out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Styles>
            )
        } else {
            return (
                <Styles>
                    <Navbar className='navbar'expand="lg">
                    <Navbar.Brand >The Gig-Economist</Navbar.Brand>
                    </Navbar>
                </Styles>
            )
        }
    }


    render() {
        // const {user} = this.props
        console.log("in navbar ")
        return (
            <Styles>{this.renderBar()}</Styles>

        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user.data,
        auth: store.authorized.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOutUser: (userId) => dispatch(signOutUser(userId))
        // the above is for api/async calls 
        // onChangeData: (newData) => dispatch(dataChangeAction(newData))   ---> this is for normal state changes, dispatch the outcome of an action creator, just to modify state
    }
}

// export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(NavBar))
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)