import React from 'react';
import ReactDOM from 'react-dom';
import styles from './hamburger-button.module.css';
import {List} from 'react-bootstrap-icons';

export default class HamburgerButton extends React.Component {
    render() {
        return (
            <button className={styles.HamburgerButton} onClick={this.props.onClick}>
                <List 
                color='white'
                size='24'
                />
            </button>
        );
    }
}