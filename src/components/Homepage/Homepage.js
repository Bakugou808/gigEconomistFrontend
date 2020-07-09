import React, { Component } from 'react'
import { connect } from "react-redux";
import { AuthHOC } from '../HOCs/AuthHOC'
import { fetchClients } from '../../actions/clientActions';
import { fetchServices } from '../../actions/serviceActions'
import { fetchTotalCurrVsProj, fetchApptThisWeek, fetchMostPopService, fetchMostLucrativeService, fetchTotalAnnualStats, fetchTimeIntensiveService } from '../../actions/statsActions'
import CurrentVsProjectedIncome from '../HomepageStats/CurrentVsProjectedIncome'
import PopularService from '../HomepageStats/PopularService'
import LucrativeService from '../HomepageStats/LucrativeService'
import TimeIntensive from '../HomepageStats/TimeIntensive'
import CurrVsProjInfoCard from '../HomepageStats/CurrVsProjInfoCard'
import LucInfoCard from '../HomepageStats/LucInfoCard'
import TimeInfoCard from '../HomepageStats/TimeInfoCard'
import TotalTaxes from '../HomepageStats/TotalTaxes'
import TaxInfoCard from '../HomepageStats/TaxInfoCard'

// import ApiCalendar from 'react-google-calendar-api';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import PopInfoCard from '../HomepageStats/PopInfoCard';


const user_id = localStorage.userId

class Homepage extends Component {

    state = {
        month: false,
        allTime: true,
    }

    componentDidMount() {
        const { onFetchServices, onFetchClients, onFetchTotalCurrVsProj, onFetchApptThisWeek, onFetchMostPopService, onFetchMostLucrativeService, onFetchTotalAnnualStats, onFetchTimeIntensiveService } = this.props

        onFetchClients(user_id)
        onFetchServices(user_id)
        onFetchTotalCurrVsProj(user_id)
        onFetchApptThisWeek(user_id)
        onFetchMostPopService(user_id)
        onFetchMostLucrativeService(user_id)
        onFetchTotalAnnualStats(user_id)
        onFetchTimeIntensiveService(user_id)
    }

    render() {
        const { match } = this.props
        const subCardStyle = {
            'width': '100%',
            'margin': '10px'
        }
        const cardStyle = {
            "margin": '10px',
        }

        const statStyle = {
            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': '100%',
            'height': '100%',
            'margin': '10px'
        }
        return (
            <Container>
                {/* current vs projected income */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Current vs. Projected Income</Card.Title><Card.Subtitle>Annual Analysis</Card.Subtitle>
                            </Card.Header>

                            <Card.Body >
                                <Row>
                                    <Col style={statStyle}>
                                        <CurrentVsProjectedIncome />
                                    </Col>
                                    <Col style={statStyle}>
                                        <CurrVsProjInfoCard />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* appointments this week --> Google Cal? */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Total Taxes This Year</Card.Title></Card.Header>
                            <Card.Body >
                                <Row>
                                    <Col style={statStyle}>
                                        <TotalTaxes /> 
                                    </Col>
                                    <Col style={statStyle}>
                                        <TaxInfoCard />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* most popular service */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Most Popular Service</Card.Title></Card.Header>
                            <Card.Body >
                                <Row>
                                    <Col style={statStyle}>
                                        <PopularService />
                                    </Col>
                                    <Col style={statStyle}>
                                        <PopInfoCard />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* most lucrative service */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Most Lucrative Service</Card.Title></Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col style={statStyle}>
                                        <LucrativeService />
                                    </Col>
                                    <Col style={statStyle}>
                                        <LucInfoCard />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* most Time intensive service */}
                <Row>
                    <Col>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Header><Card.Title>Most Time Intensive Service</Card.Title></Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col style={statStyle}>
                                        <TimeIntensive />
                                    </Col>
                                    <Col style={statStyle}>
                                        <TimeInfoCard /> 
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* total Taxes */}
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchServices: (user_id) => fetchServices(user_id, dispatch),
        onFetchClients: (user_id) => fetchClients(user_id, dispatch),
        onFetchTotalCurrVsProj: (user_id) => fetchTotalCurrVsProj(user_id, dispatch),
        onFetchApptThisWeek: (user_id) => fetchApptThisWeek(user_id, dispatch),
        onFetchMostPopService: (user_id) => fetchMostPopService(user_id, dispatch),
        onFetchMostLucrativeService: (user_id) => fetchMostLucrativeService(user_id, dispatch),
        onFetchTotalAnnualStats: (user_id) => fetchTotalAnnualStats(user_id, dispatch),
        onFetchTimeIntensiveService: (user_id) => fetchTimeIntensiveService(user_id, dispatch)
    }
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Homepage))
// export default Homepage
