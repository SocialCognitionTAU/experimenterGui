import { Toolbar, Button } from '@material-ui/core';
import { Component } from 'react';
import icon from './icon.svg';
import './ToolbarComponent.css';
import {withRouter} from 'react-router-dom';

class TooolbarComponent extends Component{
    handleClick = () => {
        this.props.history.push("/");
    }
    render(){
        return (
            <div className="toolbar-component">
                <Toolbar className="toolbar-style">
                    <Button onClick={this.handleClick} className="button-style"><img alt="" width="100" height="50" src={icon}></img> Home</Button>
                </Toolbar>
            </div>
        )
    }
}

export default withRouter(TooolbarComponent);