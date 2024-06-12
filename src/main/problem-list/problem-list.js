import React from 'react';
import ReactDOM from 'react-dom';
import styles from './problem-list.module.css';
import Header from '../../header/header';

export default class ProblemList extends React.Component {
    render() {
        return (
            <>
                <Header />
                <p>ProblemList</p>
            </>
        )
    }
}