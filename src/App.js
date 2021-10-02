import React, {Component} from 'react';
import './App.css';
import ToolbarComponent from './Components/ToolbarComponent/ToolbarComponent';
import SearchExperimenterComponent from './Components/SearchExperimenterComponent/SearchExperimenterComponent';
import SearchExperimentComponent from './Components/SearchExperimentComponent/SearchExperimentComponent';
import ExperimentComponent from './Components/ExperimentComponent/ExperimentComponent'
import LoginComponent from './Components/LoginComponent';
import {Route, Switch} from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorised: false };
  }

  authorised = (isAuthorised) => {
    this.setState({ isAuthorised: isAuthorised });
  }

  render() {
    return (
      <div className="App">
        <ToolbarComponent className="item" authorised={this.state.isAuthorised}></ToolbarComponent>
        <Switch>
          <Route exact path="/" component={() => (<LoginComponent authorise={this.authorised} />)}/>
          <Route exact path="/searchExperiment/:experimenterName" component={SearchExperimentComponent} />
          <Route exact path="/searchExperiment/:experimenterName/:experimentName"  component={ExperimentComponent}/>
          <Route exact path="/home" component={() => (<SearchExperimenterComponent isAuthorised={this.state.isAuthorised} />)} />
        </Switch>
      </div>
    );
  }
}

export default App;
