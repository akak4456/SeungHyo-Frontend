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
                <div className={styles.UserDivTop}></div>
                <div className={classNames(styles.UserStatisticsRoot, {[styles.UserStatisticsRootMobile]: isMobile})}>
                    <div className={classNames(styles.UserStatisticsLeft, {[styles.UserStatisticsLeftMobile]: isMobile})}>
                        <div className={styles.UserDiv}></div>
                        <div className={styles.UserStatisticsLeftRow}>
                            <p className={classNames(styles.UserStatisticsLeftTitle)}>등수</p>
                            <p className={styles.UserStatisticsLeftContent}>4579</p>
                        </div>
                        <div className={styles.UserDiv}></div>
                        <div className={styles.UserStatisticsLeftRankGraph}></div>
                        <div className={classNames(styles.UserDiv, styles.UserDivMarginTop24)}></div>
                        <div className={styles.UserStatisticsLeftRow}>
                            <p className={classNames(styles.UserStatisticsLeftTitle, styles.UserStatisticsLeftTitleCorrect)}>맞았습니다</p>
                            <p className={styles.UserStatisticsLeftContent}>4579</p>
                        </div>
                        <div className={styles.UserDiv}></div>
                        <div className={styles.UserStatisticsLeftRow}>
                            <p className={classNames(styles.UserStatisticsLeftTitle, styles.UserStatisticsLeftTitleWrong)}>틀렸습니다</p>
                            <p className={styles.UserStatisticsLeftContent}>4579</p>
                        </div>
                        <div className={styles.UserDiv}></div>
                        <div className={styles.UserStatisticsLeftRatioGraph}></div>
                    </div>
                    <div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default User;