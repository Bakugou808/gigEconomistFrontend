import React, { Component } from 'react'
import { connect } from 'react-redux'
import { patchClient, postNewClient } from '../../actions/clientActions'

const user_id = localStorage.userId 

class ClientForm extends Component {

    state = {
        edit: false, 
        fields: {
            company_name:'',
            contact_name: '',
            email: '',
            cell: '',
            venmo: '',
            user_id: user_id
        }
    }

    componentDidMount(){
        if(this.props.client){
            const {client} = this.props
            this.setState({fields: {
                company_name: client.company_name,
                contact_name: client.contact_name,
                email: client.email, 
                cell: client.cell, 
                venmo: client.venmo,
                user_id: user_id 
            }, edit: true
        })
        }
        
    } 

    handleChange = (e) => {
        const newFields = {...this.state.fields, [e.target.name]: e.target.value}
        this.setState({fields: newFields})
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState(prev=>({fields: {...prev.fields, company_name: prev.fields.company_name.trim(), contact_name: prev.fields.contact_name.trim()}}))

        if(this.state.edit){
            this.props.onPatchClient(this.state.fields, this.props.client.id)
        }else {
            
            this.props.onPostNewClient(this.state.fields)
        }
        this.props.handleClick()
    }
    


    render() {
        const {company_name, contact_name, email, cell, venmo} = this.state.fields
        return (
            <div>
                {this.state.error ? <h1>Try again...</h1> : null}
                <form className="signup-form" onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input className="form-control" type="name" name="company_name" value={company_name} required onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Contact Name</label>
                        <input className="form-control" type="name" name="contact_name" value={contact_name} required onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" name="email" value={email} required onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Cell</label>
                        <input className="form-control" type="tel" name="cell" value={cell} required onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>venmo</label>
                        <input className="form-control" type="name" name="venmo" value={venmo} required onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-info" type="submit">{this.state.edit ? `Save Changes` : `Add Client`}</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostNewClient: (clientData) => postNewClient(clientData, dispatch),
        onPatchClient: (clientData, clientId) => patchClient(clientData, clientId, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ClientForm)