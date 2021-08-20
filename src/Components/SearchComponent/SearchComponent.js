import { Component } from 'react';
import './SearchComponent.css';
import { withRouter } from 'react-router-dom';

class SearchComponent extends Component{
    constructor(props){
        super(props);
        this.state = {value:"", items: props.items, original: props.items}
    }

    handlChange = (event) => {
        let newValue = event.target.value;
        this.setState({value: newValue});
        this.filterItems(newValue);
    }

    filterItems = (value) => {
        let array = this.state.original.map(x => x);
        const filtered = array.filter(item => {
            return item.toLowerCase().includes(value.toLocaleLowerCase());
        });
        this.setState({items: filtered});
    }

    chooseItem = (item) => {
        this.props.chooseItem(item);
    }

    ItemList = (props) => {
        const items = props.items;
        const listItems = items.map((item) => <li onClick={this.chooseItem.bind(this, item)} className="list-item" key={item}>{item}</li>);

        return(<ul>{listItems}</ul>);
    }

    render(){    
        return (
            <div key={this.props.items} className="container">
                <h2>{this.props.text}</h2>
                <input className="textbox" type="text"  value={this.state.value} onChange={this.handlChange} placeholder={"Filter..."} />
                <this.ItemList items={this.props.items}></this.ItemList>
            </div>
        )
    }
}

export default withRouter(SearchComponent);