import React from 'react';
import ReactDOM from 'react-dom';
import styles from './primary-button.module.css';

const PrimaryButton = props => {
    return (
        <button className={styles.PrimaryButton} onClick={props.onClick}>
            {props.buttonText}
        </button>
    )
}

export default PrimaryButton;
