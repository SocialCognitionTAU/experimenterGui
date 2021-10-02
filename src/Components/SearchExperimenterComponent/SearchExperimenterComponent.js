import { Component } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import DataService from '../../Services/DataService';
import { Redirect } from 'react-router-dom';

class SearchExperimenterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {experimenterNames: [], isFetching: false, redirect: false, redirectCompoennt: "/searchExperiment/"}
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
        let address = this.state.redirectCompoennt + experimenterName;
        this.setState({redirect: true, redirectCompoennt: address})
    }

    render() {
        if (!this.props.isAuthorised) {
            return <Redirect to="/"/>;
        }

        if (this.state.redirect) {
            return <Redirect to={this.state.redirectCompoennt} />;
        }

        return (
            <div className="container">
                <SearchComponent chooseItem={this.chooseExperimenter} items={this.state.experimenterNames} text="choose experimenter" />
            </div>
        );
    }
}

export default SearchExperimenterComponent;