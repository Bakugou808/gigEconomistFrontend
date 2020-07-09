import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class TimeInfoCard extends Component {

    renderInfo = () => {
        const { data } = this.props

        const subCardStyle = {

            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': 'flex',
            'height': '100%',
            'margin': '10px'
        }

        let mostTime = []
        let nextTime = []

        for (const service in data) {
            let element = data[service]

            if (!mostTime.length) {
                mostTime = [service, element]
            }
            else if (element.sum > mostTime[1].sum) {

                nextTime = mostTime
                mostTime = []
                mostTime = [service, element]
            } else if (nextTime[1] && element.sum > nextTime[1].sum) {
                nextTime = []
                nextTime = [service, element]
            }
        }

        console.log('mostTime', mostTime)
        console.log('nextTime', nextTime)

        if (mostTime[1]) {
            return (
                <Carousel prevIcon=' ' nextIcon='' pause='hover'>
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>Top 2 Time Intensive Services</Card.Title>
                                <Card.Text >
                                    The most Time Intensive service this month was {mostTime[0]}. With a current total of {(mostTime[1].totalTimeMin / 60)/60} hours.
                                <br />
                                {nextTime[1] && `The second most Time Intensive service this month was ${nextTime[0]}. With a current total of ${(nextTime[1].totalTimeMin / 60)/60} hours.`}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>{mostTime[0]}</Card.Title>
                                <Card.Text >
                                    Currently, you have conducted {mostTime[1].apptCount} appointment(s) and spent a total of {(mostTime[1].totalTimeMin / 60)/60} hours this month, for a total profit of ${mostTime[1].sum}. 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    {nextTime[1] && <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>{nextTime[0]}</Card.Title>
                                <Card.Text >
                                Currently, you have conducted {nextTime[1].apptCount} appointment(s) and spent a total of {(nextTime[1].totalTimeMin / 60)/60} hours this month, for a total profit of ${nextTime[1].sum}. 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>}
                </Carousel>
            )
        }

    }


    render() {
        return (
            <div>
                {this.props.data && this.renderInfo()}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.mostTimeIntServ
    }
}




export default connect(mapStateToProps)(TimeInfoCard)