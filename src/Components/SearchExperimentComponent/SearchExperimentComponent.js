import { Component } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import { withRouter } from 'react-router-dom';
import DataService from '../../Services/DataService';

class SearchExperimentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { experimenterName: this.props.match.params.experimenterName, experimentNames: [] };
    }

    async componentDidMount(){
        await this.fetchExperiments();
    }

    fetchExperiments = async () => {
        let dataService = new DataService();
        let data = await dataService.getExperiments(this.state.experimenterName);

        this.setState({experimentNames: data})
    }

    chooseExperiment = (experimentName) => {
        this.props.history.push("/searchExperiment/" + this.state.experimenterName + "/" + experimentName);
    } 

    render() {
        return (
            <div className="container">
                <h1>{this.state.experimenterName}</h1>
                <SearchComponent chooseItem={this.chooseExperiment} items={this.state.experimentNames} text="choose experiment" />
            </div>
        );
    }
}
export default withRouter(SearchExperimentComponent);