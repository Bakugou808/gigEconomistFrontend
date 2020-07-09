import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class LucInfoCard extends Component {

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

        let mostLuc = []
        let nextLuc = []

        for (const service in data) {
            let element = data[service]

            if (!mostLuc.length) {
                mostLuc = [service, element]
            }
            else if (element.sum > mostLuc[1].sum) {

                nextLuc = mostLuc
                mostLuc = []
                mostLuc = [service, element]
            } else if (nextLuc[1] && element.sum > nextLuc[1].sum) {
                nextLuc = []
                nextLuc = [service, element]
            }
        }

        console.log('mostLuc', mostLuc)
        console.log('nextLuc', nextLuc)

        if (mostLuc[1]) {
            return (
                <Carousel prevIcon=' ' nextIcon='' pause='hover'>
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>Top 2 Lucrative Services</Card.Title>
                                <Card.Text >
                                    {mostLuc[1] && `The most lucrative service this month was ${mostLuc[0]}. With a current total of $${mostLuc[1].sum}.`}
                                <br />
                                {nextLuc[1] && `The second most lucractive service this month was ${nextLuc[0]}. With a current total of $${nextLuc[1].sum}.`}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    {mostLuc[1] && <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>{mostLuc[0]}</Card.Title>
                                <Card.Text >
                                    Currently has {mostLuc[1].complete} completed appointment(s) out of {mostLuc[1].apptCount} scheduled appointment(s) for this month.
                                    <br />
                                    It is projected to create ${mostLuc[1].projSum} in revenue this month.
                                    <br />
                                    It's revenue is currently at ${mostLuc[1].sum}.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>}
                    {nextLuc[1] && <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'black'}
                            style={subCardStyle}>
                            <Card.Body >
                                <Card.Title>{nextLuc[0]}</Card.Title>
                                <Card.Text >
                                    Currently has {nextLuc[1].complete} completed appointment(s) out of {nextLuc[1].apptCount} scheduled appointment(s) for this month.
                                    <br />
                                    It is projected to create ${nextLuc[1].projSum} in revenue this month.
                                    <br />
                                    It's revenue is currently at ${nextLuc[1].sum}.
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
        data: store.stats.mostLucService
    }
}




export default connect(mapStateToProps)(LucInfoCard)