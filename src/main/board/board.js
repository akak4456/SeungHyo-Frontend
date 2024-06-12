import React from 'react';
import ReactDOM from 'react-dom';
import styles from './board.module.css';
import Header from '../../header/header';

export default class Board extends React.Component {
    render() {
        return (
            <>
                <Header />
                <p>Board</p>
            </>
        )
    }
}