import { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import DataService from '../Services/DataService';

import './LoginComponent.css';

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {password: "", redirect: false };
    }

    handleChange = (event) => {
        this.setState({password: event.target.value});
    }

    submitPassword = async() => {
        let dataService = new DataService();
        let isAuthorised = await dataService.isAuthorised(this.state.password)

        if (isAuthorised) {
            this.setState({redirect: true});
        } else {
            alert("Incorrect password");
        }
    }

    render(){
        if(this.state.redirect) {
            this.props.authorise(true);
            return <Redirect to="/home"/>;
        }

        return (
            <div className="container">
                <h2>Please enter your password:</h2>
                <input  onChange={this.handleChange.bind(this)} className="password" type="password" value={this.state.password}></input>
                <div className="experiment-body">
                <div className="data-controls">
                  <button onClick={this.submitPassword.bind(this)} className="download-csv">{"Submit"}</button>
                </div>
                </div>
               
            </div>
        );
    }
}

export default withRouter(LoginComponent);