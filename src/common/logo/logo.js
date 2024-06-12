import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './logo.module.css';
import imgLogo from '../../img/logo.png';
import {Mobile, PC} from '../../responsive';

export default class Logo extends React.Component {
    render() {
        return (
            <>
                <Mobile><img src={imgLogo} className={classNames(styles.LogoMobile, {[styles.LogoMarginLeftAuto]: this.props.marginLeftAuto})}></img></Mobile>
                <PC><img src={imgLogo} className={classNames(styles.Logo, {[styles.LogoMarginLeftAuto]: this.props.marginLeftAuto})}></img></PC>
            </>
        )
    }
}