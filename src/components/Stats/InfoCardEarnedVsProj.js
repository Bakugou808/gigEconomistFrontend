import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import {connect} from 'react-redux'

class InfoCardEarnedVsProj extends Component {


    
    render() {
        const cardStyle = {
            "margin": '10px',
        }
        const {earnedVsProjected} = this.props
        return (
            <div>
                {earnedVsProjected.earned && <Card bg={'warning'}
                        // key={service.id}
                        border='info'
                        style={cardStyle}
                        text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>
                        
                        <Card.Text style={cardStyle}>You've made ${earnedVsProjected.earned.sum} so far this month, out of a projected ${earnedVsProjected.projected.sum}.</Card.Text>
                              
                </Card>}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        earnedVsProjected: store.stats.serviceStats.earnedVsProjected
    }
}

export default connect(mapStateToProps)(InfoCardEarnedVsProj)