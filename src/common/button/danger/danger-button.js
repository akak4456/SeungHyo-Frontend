import React from 'react';
import ReactDOM from 'react-dom';
import styles from './danger-button.module.css';

const DangerButton = props => {
    return (
        <button className={styles.DangerButton} onClick={props.onClick}>
            {props.buttonText}
        </button>
    )
}

export default DangerButton;
