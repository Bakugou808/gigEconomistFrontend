import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewGig, patchGig } from '../../actions/gigActions'
import Autocomplete from './Autocomplete'
import ClientForm from '../Clients/ClientForm'

class GigForm extends Component {

    state = {
        edit: false,
        error: false,
        newClient: false,
        fields: {
            title: '',
            details: '', 
            service_type: '', 
            client_id: '',
            service_id: '',
            completed: false,
            // amount_due: 0.00
            // user_id: this.props.user.id, 
        }
    }

    componentDidMount(){
        if (this.props.gig){
            const {gig} = this.props 
            this.setState({edit: true, fields: {
                title: gig.title,
                details: gig.details,
                service_type: gig.service_type,
                client_id: gig.client_id,
                service_id: gig.service_id, 
                completed: gig.completed,
                // amount_due: gig.amount_due 
            }})
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({fields: newFields})
    }
    

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.edit){
            this.props.onPatchGig(this.state.fields, this.props.gig.id)
        }else{
            this.props.onPostNewGig(this.state.fields)
        }
        this.props.closeForm()
    };

    suggestions = () => {
        const {clients} = this.props 
        const suggestions = clients.map(client=> `${client.company_name} - ${client.contact_name}`)
        return suggestions
    }

    setClient = (clientInfo) => {
        const {clients, service} = this.props 
        const comp_contact = clientInfo.split(' - ')
        
        const client = clients.filter(client => client.company_name === comp_contact[0] && client.contact_name === comp_contact[1] )[0]
        
        if(client.id){
            this.setState(prev => ({fields: {...prev.fields, client_id: client.id, service_type: service.title, service_id: service.id}}))
            // this.setState({fields: {}client_id: client.id, service_type: service.title})
        }
    }
    
    handleNewClient = () => {
        this.setState(prev => ({newClient: !prev.newClient}))
    }

    

    

    render() {
        const {title, details, amount_due} = this.state.fields 
        const newClientStyle = {
            'cursor':'pointer'
        }
        return (
            <div>
            {this.state.error ? <h1>Try again...</h1> : null}
           <form className="signup-form" onSubmit = {this.handleSubmit}>
             <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="name" name="title" value={title} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Details</label>
                <input className="form-control" type="name" name="details" value={details} required onChange={this.handleChange}/>
            </div>
            {/* <div className="form-group">
                <label>Amount Due</label>
                <input className="form-control" type="number" name="amount_due" value={amount_due} required onChange={this.handleChange}/>
            </div> */}
            </form>
            <div className="form-group">
                <label>Search Clients</label><label onClick={this.handleNewClient} style={newClientStyle}>/New Client</label> 
                {(!this.state.newClient && !this.state.edit) && <Autocomplete suggestions={this.suggestions()} setClient={this.setClient} /> }
                {this.state.newClient && <ClientForm handleClick={this.handleNewClient}/>}
                {this.state.edit && <Autocomplete client={this.props.gig.client} suggestions={this.suggestions()} setClient={this.setClient} />}
            </div>

               <button className="btn btn-info" type="submit" onClick={this.handleSubmit}>Submit</button>
               {/* </form> */}
       </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        clients: store.clients.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostNewGig: (gigData) => postNewGig(gigData, dispatch),
        onPatchGig: (gigData, gigId) => patchGig(gigData, gigId, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GigForm)