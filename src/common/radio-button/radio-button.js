import React from 'react';
import ReactDOM from 'react-dom';
import styles from './radio-button.module.css';

const RadioButton = props => {
    return (
        <label className={styles.RadioButtonLabel}>
            <input type="radio" name="name" value = "value"/>
            <span>{props.text}</span>
        </label>
    )
}

export default RadioButton;