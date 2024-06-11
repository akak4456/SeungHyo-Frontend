import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './logo.module.css';
import imgLogo from '../../img/logo.png';

export default class Logo extends React.Component {
    render() {
        return (
            <img src={imgLogo} className={classNames(styles.Logo, {[styles.LogoMarginLeftAuto]: this.props.marginLeftAuto})}></img>
        )
    }
}