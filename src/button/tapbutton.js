import React from 'react';
import ReactDOM from 'react-dom';
import './tapbutton.css';
import { Link } from 'react-router-dom';

export default class TapButton extends React.Component {
    render() {
        const inner = <span>{this.props.buttonElement}</span>;
        return (
            <div className='tap-button-root'>
                {this.props.linkTo ? <Link to={this.props.linkTo}>{inner}</Link> : inner}
            </div>
        );
    }
}