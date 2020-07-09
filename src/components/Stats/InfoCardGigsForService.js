import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


class InfoCardGigsForService extends Component {

    mostPopularGig = () => {
        const { gigsThisMonth } = this.props
        let popGig = ''
        let numApp = 0
        for (var key in gigsThisMonth) {
            if (gigsThisMonth[key].length > numApp) {
                numApp = gigsThisMonth[key].length
                popGig = key
            }
        }
        let info = { gig: popGig, num: numApp }
        return info
    }

    render() {
        const cardStyle = {
            "margin": '10px',
        }
        const info = this.mostPopularGig()
        const { selectedService } = this.props
        return (
            <div>
                <Card bg={'warning'}
                    // key={service.id}
                    border='info'
                    style={cardStyle}
                    text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>

                    <Card.Text style={cardStyle}>The most popular Gig within {selectedService.title} was {info.gig} with {info.num > 1 ? `${info.num} appointments` : `${info.num} appointment`} scheduled for this month</Card.Text>

                </Card>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        selectedService: store.services.selectedService,
        gigsThisMonth: store.stats.serviceStats.gigsThisMonth
    }
}

export default connect(mapStateToProps)(InfoCardGigsForService)