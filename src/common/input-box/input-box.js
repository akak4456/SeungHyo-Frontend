import React from 'react';
import ReactDOM from 'react-dom';
import styles from './input-box.module.css';

const InputBox = props => {
    return (
        <input className={styles.InputBox} {...props}></input>
    )
}

export default InputBox;
