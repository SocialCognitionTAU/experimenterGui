import axios from 'axios';

class DataService {
    getExperimenters = async() => {
        let data =  await axios.get("https://socialcog.xyz/results/experimenters/getExperimenters");

        return data.data;
    }

    getExperiments = async(experimenterName) => {
        let data =  await axios.get("https://socialcog.xyz/results/experimenters/name/" + experimenterName);

        return data.data;
    }

    getExperimentData = async(experimentName) => {
        let data =  await axios.get("https://socialcog.xyz/results/" + experimentName);

        return data.data;
    }
}

export default DataService;