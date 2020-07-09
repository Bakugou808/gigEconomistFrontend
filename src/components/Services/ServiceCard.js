import React, { Component, Fragment } from 'react'
import { Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'


import { connect } from 'react-redux'
import { deleteService } from '../../actions/serviceActions'
import { selectService } from '../../actions/serviceActions'
import { fetchServicesMonthsGigs, fetchServiceEarnedVsProj } from '../../actions/statsActions'
import { clearAppointmentsList } from '../../actions/appointmentsActions'



import { setGigsForService } from '../../actions/gigActions'
import NewServiceForm from '../Services/NewServiceForm'
import ServiceView from '../Services/ServiceView'


import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'


import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'




class ServiceCard extends Component {

    state = {
        edit: false,
        redirect: false,
    }

    handleEdit = () => {
        this.setState(prev => ({ edit: !prev.edit }))
    }

    handleRedirect = () => {
        // this.setState(prev => ({ redirect: !prev.redirect }))
    }

    handleView = () => {
        this.props.onSelectService(this.props.service)
        this.props.onGetMonthsGigs(this.props.service.id)
        this.props.onEarnedVsProj(this.props.service.id)
        this.props.onSetGigsForService(this.props.service.gigs)
        this.props.onClearAppointments()

    }



    render() {
        const { service, onDeleteService, match, history, onSetGigsForService, onSelectService } = this.props

        const location = {
            pathname: `${match.url}/${service.id}`,
            state: { service: service }
        }

        const titleStyle = {
            "font-size": '23px',
            'cursor': 'pointer',
            'margin' : '10px'
        }

        const cardStyle = {
            "margin": '10px',
        }

        const descStyle = {
            "padding-top": '10px',
            // 'margin' : '10px'

        }
        const payStyle = {
            "padding-top": '5px',
            // 'margin' : '10px'

        }

        const descStyle2 = {
            "padding-bottom": '10px',
            'margin' : '10px'

        }
        const payStyle2 = {
            "padding-top": '5px',
            'margin' : '10px'

        }

        const subCardStyle = {
            'width': '100%',
            // 'margin': '10px'
        }

        const buttonStyle = {
            'padding-left' : '30px',
            'align' : 'right'
        }


        if (this.state.redirect) {
            history.push(location)
            history.replace(location)
            onSetGigsForService(service.gigs)
            onSelectService(service)
            // redirects to serviceView component
            return <Redirect to={location} />
        }
        return (

            <div style={cardStyle}>
                <Container>
                    {!this.props.displayGigs &&
                        <Fragment>
                            <Row >
                                <Col><div style={titleStyle} onClick={this.handleView} onDoubleClick={this.handleRedirect} >{service.title}</div></Col>
                                <Col style={payStyle}>{`Pay Range: ${service.pay_range}`}</Col>

                                <Col md={{ span: 3, offset: 1 }} >
                                    <Button variant='outline-warning' size='sm' onClick={this.handleEdit}><BsPencilSquare /></Button>
                                    <Button variant='outline-warning' size='sm' onClick={() => onDeleteService(service.id)}><BsFillTrashFill /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={descStyle}>{`Description: ${service.description}`}</Col>
                            </Row>
                        </Fragment>}
                    {/* <Col>{`Description: ${service.description}`}</Col> */}
                    {this.props.displayGigs &&
                        <Accordion defaultActiveKey='0'>
                            <Card
                                bg={'info'}
                                // key={service.id}
                                border='warning'
                                style={subCardStyle}
                                text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                            >
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <Card
                                            bg={'info'}
                                            // key={service.id}
                                            border='warning'
                                            style={subCardStyle}
                                            text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                                        >
                                            <Row >
                                                <Col><div style={titleStyle} onClick={this.handleView} onDoubleClick={this.handleRedirect} >{service.title}</div></Col>
                                                <Col style={payStyle2}>{`Pay Range: ${service.pay_range}`}</Col>
{/* 
                                                <Col md={{ span: 3, offset: 1 }} >
                                                    <Button variant='outline-warning' size='sm' onClick={this.handleEdit}><BsPencilSquare /></Button>
                                                    <Button variant='outline-warning' size='sm' onClick={() => onDeleteService(service.id)}><BsFillTrashFill /></Button>
                                                </Col> */}
                                            </Row>
                                            <Row>
                                                <Col style={descStyle2}>{`Description: ${service.description}`}</Col>

                                                <Col md={{ span: 3, offset: 1 }} style={buttonStyle}>
                                                    <Button variant='outline-warning' size='sm' onClick={this.handleEdit}><BsPencilSquare /></Button>
                                                    <Button variant='outline-warning' size='sm' onClick={() => onDeleteService(service.id)}><BsFillTrashFill /></Button>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {this.props.displayGigs && <ServiceView />}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    }

                </Container>
                <div>
                    {this.state.edit && <NewServiceForm service={service} handleClick={this.handleEdit} />}
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteService: (serviceId) => deleteService(serviceId, dispatch),
        onSetGigsForService: (gigsList) => dispatch(setGigsForService(gigsList)),
        onSelectService: (service) => dispatch(selectService(service)),
        onGetMonthsGigs: (serviceId) => fetchServicesMonthsGigs(serviceId, dispatch),
        onEarnedVsProj: (serviceId) => fetchServiceEarnedVsProj(serviceId, dispatch),
        onClearAppointments: () => dispatch(clearAppointmentsList())

    }
}


export default connect(null, mapDispatchToProps)(ServiceCard)