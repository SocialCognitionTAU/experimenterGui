import React, {Component} from 'react';
import Select from 'react-select';
  

class FilterComponent extends React.Component {
   constructor(props) {
       super(props);
       this. state = {
        selectedOptions: []
    };
   }

    handleChange = (selectedOptions) => {
        this.setState({ selectedOptions });

        let selectedOptionNames = selectedOptions.map(item => item.value);

        this.props.onSelectCallback(selectedOptionNames);
    }

    
  render() {
      console.log(this.props.options)
    if (!this.props.options || !this.props.options.length > 1){
        return null;
    }

    return (
      <React.Fragment>
        <Select
          isMulti
          value={this.state.selectedOptions}
          onChange={this.handleChange}
          options={this.props.options}
          placeholder={this.props.placeholder}
        />
      </React.Fragment>
    );
  }
}

export default FilterComponent;