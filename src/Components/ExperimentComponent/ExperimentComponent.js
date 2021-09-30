import { Component } from 'react';
import "./ExperimentComponent.css"
import { withRouter } from 'react-router-dom';
import JsonService from '../../Services/jsonService';
import DataService from '../../Services/DataService';

class ExperimentComponent extends Component{
    constructor(props){
        super(props);
        this.state = {experimenterName: this.props.match.params.experimenterName, experimentName: this.props.match.params.experimentName };
    }

    async componentDidMount(){
        await this.fetchData();
    }

    fetchData = async () => {
        let dataService = new DataService();
        let data = await dataService.getExperimentData(this.state.experimentName);

        this.setState({data: data})
    }

    goToExperimenterPage = () => {
        this.props.history.goBack();
        
    }

    download = () => {
        let e = new JsonService();
        e.exportFile(this.state.data, this.state.experimentName);
    }

    render(){
        return (
            <div className="container">
                <h1 className="experimenter-name" onClick={this.goToExperimenterPage.bind(this)}>{this.props.match.params.experimenterName}</h1>
                <h2>{this.props.match.params.experimentName}</h2>
                <div className="experiment-body">
                <div className="data-controls">
                  <button onClick={this.download.bind(this)} className="download-csv">{"Download Experiment Data"}</button>
                </div>
                </div>
               
            </div>
        );
    }
}

export default withRouter(ExperimentComponent);