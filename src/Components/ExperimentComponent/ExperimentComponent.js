import { Component } from 'react';
import "./ExperimentComponent.css"
import { withRouter } from 'react-router-dom';
import JsonService from '../../Services/jsonService';
import DataService from '../../Services/DataService';

class ExperimentComponent extends Component{
    constructor(props){
        super(props);
        this.state = {experimenterName: this.props.match.params.experimenterName, experimentName: this.props.match.params.experimentName, participants: [], ids: [], chooseAll: true };
    }

    async componentDidMount(){
        await this.fetchData();
    }

    fetchData = async () => {
        let dataService = new DataService();
        let data = await dataService.getExperimentData(this.state.experimentName);
        let ids = data.map(participant => participant._id);
        console.log(data)

        this.setState({data: data, participants:data, ids: ids})
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
            console.log("in chooseAll")
            console.log(this.state)
            this.setState({ids: newIds, chooseAll: true});
        }
    }

    getTableLine = (participantData) => {
        console.log(participantData)
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
                <this.getTable></this.getTable>
                </div>
               
            </div>
        );
    }
}

export default withRouter(ExperimentComponent);