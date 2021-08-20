import React, {Component} from 'react';
import './App.css';
import ToolbarComponent from './Components/ToolbarComponent/ToolbarComponent';
import SearchExperimenterComponent from './Components/SearchExperimenterComponent/SearchExperimenterComponent';
import SearchExperimentComponent from './Components/SearchExperimentComponent/SearchExperimentComponent';
import ExperimentComponent from './Components/ExperimentComponent/ExperimentComponent'
import {Route, Switch} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolbarComponent className="item"></ToolbarComponent>
        <Switch>
          <Route exact path="/" component={SearchExperimenterComponent}/>
          <Route exact path="/searchExperiment/:experimenterName" component={SearchExperimentComponent} />
          <Route exact path="/searchExperiment/:experimenterName/:experimentName"  component={ExperimentComponent}/>
        </Switch>
      </div>
    );
  }
}

export default App;
