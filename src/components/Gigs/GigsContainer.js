import React, { Component } from 'react'
import {AuthHOC} from '../HOCs/AuthHOC'


class GigsContainer extends Component {
    render() {
        return (
            <div>
                I am the Container of Gigs
            </div>
        )
    }
}

export default AuthHOC(GigsContainer)