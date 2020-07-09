import React, { Component } from 'react'
import { signUpUser } from '../../actions/userActions'
import { connect } from 'react-redux';

class Signup extends Component {

    state = {
        error: false,
        fields: {
          email: '',
          password: '',
          password_confirmation: '',
          firstName: '', 
          lastName: '', 
          username: ''
        }
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };  

    handleSubmit = e => {
        e.preventDefault();
        const {password, password_confirmation} = this.state.fields
        if (password_confirmation === password) {
            this.props.onSignUpUser(this.state.fields, this.props.history)
            this.props.history.push('/home')
        } else {
            alert("passwords do not match")
        }
        
    };
    

    render() {
        const {firstName, lastName, username, email, password, password_confirmation} = this.state.fields
        return (
        <div>
            {this.state.error ? alert(`Sorry, that Signup didn't work, try again...`) : null}
           <form className="signup-form" onSubmit = {this.handleSubmit}>
             <div className="form-group">
                <label>First Name</label>
                <input className="form-control" type="name" name="firstName" value={firstName} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input className="form-control" type="name" name="lastName" value={lastName} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input className="form-control" type="name" name="username" value={username} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
               <label>Email</label>
               <input className="form-control" type="email" name="email" value={email} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
               <label>Password</label>
               <input className="form-control" type="password" name="password" value={password} required onChange={this.handleChange}/>
            </div>
            <div className="form-group">
               <label>Verify Password</label>
               <input className="form-control" type="password" name="password_confirmation" value={password_confirmation} required onChange={this.handleChange}/>
            </div>
               <button className="btn btn-info" type="submit">Signup</button>
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
      onSignUpUser: (userSignUpData, history)=> signUpUser(userSignUpData, history, dispatch), 
      // the above is for api/async calls 
      // onChangeData: (newData) => dispatch(dataChangeAction(newData))   ---> this is for normal state changes, dispatch the outcome of an action creator, just to modify state
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps )(Signup)