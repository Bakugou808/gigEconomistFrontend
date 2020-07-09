import React, { Component } from 'react'
import { connect } from 'react-redux'
import GigForm from './GigForm'
import { selectGig, deleteGig, patchGig } from '../../actions/gigActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'

class GigCard extends Component {

    state = {
        edit: false,
    }


    handleEdit = () => {
        this.setState(prev => ({edit: !prev.edit}))
    }
    

    renderDate = (created_at) => {
        let date = new Date(created_at).toLocaleDateString('en-GB', {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        })
        return date 
    }
    render() {
        const cardStyle = {
            "margin": '10px',
        }
        const titleStyle = {
            'cursor': 'pointer'
        }
        const { gig, onSelectGig, onDeleteGig } = this.props

        return (
            <Card
                bg={'info'}
                // key={service.id}
                border='warning'
                style={cardStyle}
                text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                
            >
                <Card.Header>
                    <Container>
                        <Row>
                            <Col><Card.Title style={titleStyle} onClick={()=>onSelectGig(gig)} >{gig.title}</Card.Title></Col>
                            <Col>Client: {gig.client.company_name}</Col>
                            <Col>Contact: {gig.client.contact_name}</Col>
                            <Col>Created: {this.renderDate(gig.created_at)}</Col>
                            <Col>Completed: {gig.completed ? `Completed` : `Ongoing`}</Col>
                            <Col>
                            <Button variant='outline-warning' size='sm' onClick={this.handleEdit}><BsPencilSquare/></Button>
                            <Button variant='outline-warning' size='sm' onClick={()=>onDeleteGig(gig.id)}><BsFillTrashFill/></Button>
                            </Col>
                        </Row>
                        {this.state.edit && <GigForm closeForm={this.handleEdit} gig={gig}/>}
                    </Container>
                </Card.Header>
            </Card>
        )
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
       onSelectGig: (gig) => dispatch(selectGig(gig)),
       onDeleteGig: (gigId) => deleteGig(gigId, dispatch), 
       onPatchGig: (gigData, gigId) => patchGig(gigData, gigId, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(GigCard)