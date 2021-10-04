import { Component } from 'react';
import "./ExperimentComponent.css"
import { withRouter } from 'react-router-dom';
import JsonService from '../../Services/jsonService';
import DataService from '../../Services/DataService';
import FilterComponent from './filterComponent';

class ExperimentComponent extends Component{
    constructor(props){
        super(props);
        this.state = {experimenterName: this.props.match.params.experimenterName, experimentName: this.props.match.params.experimentName, participants: [], ids: [], chooseAll: true, filteredVersions: [], filteredConditions: [] };
    }

    async componentDidMount(){
        await this.fetchData();
    }

    fetchData = async () => {
        let dataService = new DataService();
        let data = await dataService.getExperimentData(this.state.experimentName);
        let ids = data.map(participant => participant._id);
        let versions = data.map(item => item.version)
        versions = versions.filter((item, index) => versions.indexOf(item) === index);
        let conditions = data.map(item => item.condition);
        conditions = conditions.filter((item, index) => conditions.indexOf(item) === index);
        let versions2 = [];
        let conditions2 = [];

        versions.forEach(item => {
            let object = {
                value: item,
                label: item
            }
            versions2.push(object);
        });

        conditions.forEach(item => {
            let object = {
                value: item,
                label: item
            }
            conditions2.push(object);
        });

        this.setState({data: data, participants:data, ids: ids, versions: versions2, conditions: conditions2})
    }

    getTable = () => {
        return (
            <table>
                <thead>
                {this.getHeaders()}
                </thead>
                <tbody>
                {this.getTableLines()}
                </tbody>
            </table>
        );
    }

    getHeaders = () => {
        return(
            <tr className="table-row">
                <th>Download</th>
                <th>Version</th>
                <th>Condition</th>
                <th>ID</th>
            </tr>
        );
    }

    getTableLines = () => {
        let lines = [];

        this.state.participants.forEach(participant => {
            lines.push(this.getTableLine(participant));
        });

        return lines;
    }

    onClick = (id) => {
        if (this.state.chooseAll){
            this.setState({chooseAll: false});
        }

        let newIds = this.state.ids;

        if (!this.state.ids.includes(id)){
            newIds.push(id);

            if (newIds.length == this.state.participants.length){
                this.setState({chooseAll: true});
            }
        } else {
            newIds = newIds.filter(item => item != id);
        }

        this.setState({ids: newIds});
    }

    chooseAll = () => {
        if (this.state.chooseAll){
            this.setState({ids:[], chooseAll:false});
        } else {
            let newIds = this.state.participants.map(item => item._id);
            this.setState({ids: newIds, chooseAll: true});
        }
    }

    getTableLine = (participantData) => {
        let id = participantData._id;
        let chosen = this.state.ids.includes(id);
        return(
            <tr className="table-row" key={id}>
                <td><button onClick={this.onClick.bind(this, id)} className={(chosen) ? "chosen-participant" : "download-button"}/></td>
                <td> <div className="id">{participantData.version ? participantData.version : "Missing"}</div></td>
                <td> <div className="id">{participantData.condition ? participantData.condition : "Missing"}</div></td>
                <td> <div className="id">{participantData.subjectId ? participantData.subjectId : "Missing"}</div></td>
            </tr>
        );
    }

    goToExperimenterPage = () => {
        this.props.history.goBack();
        
    }

    download = () => {
        let e = new JsonService();
        let data = [];

        this.state.data.forEach(participant => {
            if (this.state.ids.includes(participant._id)) {
                data.push(participant);
            }
        })

        e.exportFile(data, this.state.experimentName);
    }

    filterByVersion = (selectedVersions) => {
        this.setState({filteredVersions: selectedVersions});
        
        this.filter(selectedVersions, this.state.filteredConditions);
    }

    filter = (selectedVersions, selectedConditions) => {
        let ids = [];

        this.state.data.forEach(participant => {
            if (selectedVersions.includes(participant.version) || selectedVersions.length == 0) {
                if (selectedConditions.includes(participant.condition) || selectedConditions.length == 0) {
                    ids.push(participant._id);
                }
            }

        });

        let areAllChosen = ids.length == this.state.data.length;

        this.setState({ids: ids, chooseAll: areAllChosen});
    }

    filterByCondition = (selectedConditions) => {
        this.setState({filteredConditions: selectedConditions});
        
        this.filter(this.state.filteredVersions, selectedConditions);
    }

    render(){
        return (
            <div className="container">
                <h1 className="experimenter-name" onClick={this.goToExperimenterPage.bind(this)}>{this.props.match.params.experimenterName}</h1>
                <h2>{this.props.match.params.experimentName}</h2>
                <div className="experiment-body">
                <div className="data-controls">
                <div className="select-all">
                  <button className={this.state.chooseAll ? "chosen-participant" : "download-button"} onClick={this.chooseAll.bind(this)}></button>  
                  <label>{"Select all"}</label>
                  </div>
                  <button onClick={this.download.bind(this)} className="download-csv">{"Download Experiment Data"}</button>
                </div>
                <div className="table-metadata">
                    <div>
                    <label>{"Number of participants:"}</label>
                    <label>{this.state.participants.length}</label>
                    </div>
                    <div>
                    <label>{"Selected:"}</label>
                    <label>{this.state.ids.length}</label>
                    </div>
                    </div>
                    <div className="filters">
                    <FilterComponent onSelectCallback={this.filterByVersion.bind(this)} placeholder="filter by version" options={this.state.versions}></FilterComponent>
                    <FilterComponent onSelectCallback={this.filterByCondition.bind(this)} placeholder="filter by condition" options={this.state.conditions}></FilterComponent>
                </div>
                <this.getTable></this.getTable>
                </div>
               
            </div>
        );
    }
}

export default withRouter(ExperimentComponent);