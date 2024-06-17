import React from 'react';
import ReactDOM from 'react-dom';
import styles from './user.module.css';
import Header from '../../header/header';
import {useMediaQuery} from 'react-responsive';
import { isMobileQuery } from '../../responsive';
import classNames from 'classnames';

const User = () => {
    const isMobile = useMediaQuery({
        query : isMobileQuery
    });
    return (
        <>
            <Header></Header>
            <main className={styles.UserRoot}>
                <p className={styles.UserName}>akak4456</p>
                <blockquote className={styles.UserMessage}>컴공 17 조승효</blockquote>
                <div className={styles.UserDiv}></div>
                <div className={classNames(styles.UserStatisticsRoot, {[styles.UserStatisticsRootMobile]: isMobile})}>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default User;