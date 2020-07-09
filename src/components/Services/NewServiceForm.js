import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postNewService, patchService } from '../../actions/serviceActions'


class NewServiceForm extends Component {

    state = {
        edit: false,
        error: false,
        fields: {
            title: '',
            description: '', 
            pay_range: '', 
            user_id: this.props.user.id,
        }
    }

    componentDidMount(){
        if(this.props.service){
            const {service} = this.props
            this.setState({fields: {title: service.title, description: service.description, pay_range: service.pay_range}, edit: true, service_id: service.id})
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({fields: newFields})
    }
    

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.edit){
            this.props.onPatchService(this.state.fields, this.state.service_id)
        }else{
            this.props.onPostNewService(this.state.fields)
        }
        this.props.handleClick()
    };



    render() {

        const formStyle = {
            'margin': '10px'
        }

        const divStyle = {
            'border-style': 'solid',
            'margin': '8px',
            'border-radius': '5px',
            'border': '2px solid '

        }

        const {title, description, pay_range} = this.state.fields 
        return (
            <div style={divStyle}>
            {this.state.error ? <h1>Try again...</h1> : null}
           <form className="signup-form" style={formStyle}onSubmit = {this.handleSubmit}>
             <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="name" name="title" value={title} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input className="form-control" type="name" name="description" value={description} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Pay Range</label>
                <input className="form-control" type="name" name="pay_range" value={pay_range} required onChange={this.handleChange}/>
            </div>
               <button className="btn btn-info" type="submit">Submit</button>
           </form>
       </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostNewService: (fields) => postNewService(fields, dispatch),
        onPatchService: (fields, serviceId) => patchService(fields, serviceId, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewServiceForm)