import React, { Component } from 'react'
import { connect } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CurrVsProjInfoCard extends Component {

    createMonthsSlide = () => {
        const { data } = this.props
        const year = Object.keys(data)
        const months = data[year].monthly
        const div = []
        const subCardStyle = {

            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': 'flex',
            'height': '100%',
            'margin': '10px'
        }

        

        for (const month in months) {
            if (months.hasOwnProperty(month)) {
                const element = months[month];
                div.push(
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Body>
                                <Card.Title>{month}</Card.Title>
                                <Card.Subtitle>Paid: ${element.curr} <br/> Proj: ${element.proj} <br/> Total Appointments: {element.apptCount} <br/> Completed Appointments: {element.compAppts}</Card.Subtitle>
                                <Card.Text></Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                )
            }
        }
        return div

    }

    render() {
        const { data } = this.props

        const subCardStyle = {

            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': 'flex',
            'height': '100%',
            'margin': '10px'
        }

        const iconStyle = {
            'display': 'hidden'
        }
        const year = Object.keys(data)
        // debugger
        return (
            <div>
              
                <Carousel prevIcon=' ' nextIcon='' pause='hover'>
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            {data[year] && <Card.Body>
                                <Card.Title>Total Annual For {year}</Card.Title>
                                <Card.Subtitle style={subCardStyle}>Current Earnings: ${data[year].totals.totalCurr} <br /> Projected Earnings: ${data[year].totals.totalProj} <br /> Total Number Of Appointments Scheduled: {data[year].totals.totalAppts} <br /> Total Number Of Appointments Completed: {data[year].totals.compAppts}</Card.Subtitle>
                                {/* <Card.Subtitle>Projected Earnings: ${data[year].totalProj}</Card.Subtitle> */}
                                {/* <Card.Text>Total Number Of Appointments Scheduled: {data[year].totalAppts}</Card.Text>
                                        <Card.Text>Total Number Of Appointments Completed: {data[year].compAppts}</Card.Text> */}
                            </Card.Body>}
                        </Card>
                    </Carousel.Item>
                {data[year] && this.createMonthsSlide()}
                </Carousel>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.currentVsProj
    }
}




export default connect(mapStateToProps)(CurrVsProjInfoCard)