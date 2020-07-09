import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PopInfoCard extends Component {

    renderAppInfo = () => {
        const { data } = this.props

        let mostPop = []
        let nextPop = []

        for (const service in data) {
            let element = data[service]
            
            if (!mostPop.length) {
                mostPop = [service, element]
            
            }
            else if (element.length > mostPop[1].length) {
                
                nextPop = mostPop
                mostPop = []
                mostPop = [service, element]
            } else if (nextPop[1] && element.length > nextPop[1].length) {
                
                nextPop = []
                nextPop = [service, element]
            } else {
                nextPop = []
                nextPop = [service, element]            }
        }
        console.log('mostPop', mostPop)
        console.log('nextPop', nextPop)

        if (mostPop[1]) {
            const subCardStyle = {

                'align-items': 'center',
                'justify-content': 'center',
                'display': 'flex',
                'width': '100%',
                'height': '100%',
                'margin': '10px'
            }
            return (
                // <Carousel prevIcon=' ' nextIcon='' pause='hover'>
                //     <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>Top 2 Popular Services</Card.Title>
                                <Card.Text >
                                    {mostPop[1] && `The most popular service this month was ${mostPop[0]}.
                                    With a total of ${mostPop[1].length} scheduled appointment(s).`}
                                    <br />
                                    {nextPop[1] && `The second most popular service this month was ${nextPop[0]}.
                                    With a total of ${nextPop[1].length} scheduled appointment(s).`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    // </Carousel.Item>
                    /* <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>{mostPop[0]}</Card.Title>
                                <Card.Text >
                                    The most popular service this month was {mostPop[0]}.
                                    With a total of {mostPop[1].length} scheduled appointment(s).
                                    <br />
                                    The second most popular service this month was {nextPop[0]}.
                                    With a total of {nextPop[1].length} scheduled appointment(s).
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
                                <Card.Title>Top 2 Popular Services</Card.Title>
                                <Card.Text >
                                    The most popular service this month was {mostPop[0]}.
                                    With a total of {mostPop[1].length} scheduled appointment(s).
                                    <br />
                                    The second most popular service this month was {nextPop[0]}.
                                    With a total of {nextPop[1].length} scheduled appointment(s).
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item> */
                // </Carousel>
            )
        }

    }


    render() {
        const { data } = this.props
        const subCardStyle = {

            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': '100%',
            'height': '100%',
            'margin': '10px'
        }

        return (
            <div>
                {/* <Card border='info'
                    bg="warning"
                    text={'black'}
                    style={subCardStyle}>
                    <Card.Body >
                        <Card.Title>Top 2 Popular Services</Card.Title> */}
                        {/* <Card.Text> */}
                        {data && this.renderAppInfo()}
                        {/* </Card.Text> */}
                    {/* </Card.Body>
                </Card> */}
            </div >
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.mostPopService
    }
}




export default connect(mapStateToProps)(PopInfoCard)