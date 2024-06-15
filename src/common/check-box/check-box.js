import React from 'react';
import ReactDOM from 'react-dom';
import styles from './check-box.module.css';

const CheckBox = props => {
    return (
        <div className={styles.CheckBoxContainer}>
            <input type="checkbox" className={styles.CheckBox} {...props} />
            <label for={props.id}>{props.text}</label>
        </div>
    )
}

export default CheckBox;