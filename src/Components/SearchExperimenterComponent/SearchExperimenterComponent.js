import { Component } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import DataService from '../../Services/DataService';

class SearchExperimenterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {experimenterNames: [], isFetching: false}
    }

    async componentDidMount(){
        await this.fetchExperimenters();
    }

    fetchExperimenters = async () => {
        this.setState({isFetching: true});
        let dataService = new DataService();
        let data = await dataService.getExperimenters();

        this.setState({isFetching: false, experimenterNames: data})
    }

    chooseExperimenter = (experimenterName) => {
        this.props.history.push("/searchExperiment/" + experimenterName);
    }

    render() {
        return (
            <div className="container">
                <SearchComponent chooseItem={this.chooseExperimenter} items={this.state.experimenterNames} text="choose experimenter" />
            </div>
        );
    }
}

export default SearchExperimenterComponent;