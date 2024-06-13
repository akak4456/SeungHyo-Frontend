import React from 'react';
import ReactDOM from 'react-dom';
import styles from './hamburger-button.module.css';
import {List} from 'react-bootstrap-icons';

const HamburgerButton = props => {
    return (
        <button className={styles.HamburgerButton} onClick={props.onClick}>
            <List 
            color='white'
            size='12'
            />
        </button>
    );
}

export default HamburgerButton;