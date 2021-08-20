import FileSaver from "file-saver";

class JsonService {
    constructor() { }

    exportFile = (data, experimentName) => {
        let fileName = experimentName + ".json";

        let stringData = data.map(item => JSON.stringify(item));

        let file = new File(stringData, fileName, {type: "text/plain;charset=utf-8"});

        FileSaver.saveAs(file);
    }
}

export default JsonService;