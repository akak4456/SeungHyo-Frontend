import React from 'react';
import ReactDOM from 'react-dom';
import styles from './user.module.css';
import Header from '../../header/header';
import {useMediaQuery} from 'react-responsive';
import { isMobileQuery } from '../../responsive';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
const UserStatisticsRightSideContainer = props => {
    return (
        <div className={styles.UserStatisticsRightSideContainerRoot}>
            <p className={styles.UserStatisticsRightSideTitle}>{props.title}</p>
            {props.children}
        </div>
    );
}
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
                    <div className={classNames(styles.UserStatisticsRightSide, {[styles.UserStatisticsRightSideMobile]: isMobile})}>
                        <UserStatisticsRightSideContainer title={'2023 ~ 2024년'}>
                            <div className={styles.UserStatisticsRightSideDaily}>

                            </div>
                        </UserStatisticsRightSideContainer>
                        <div className={styles.marginTop24}></div>
                        <UserStatisticsRightSideContainer title={'맞은 문제'}>
                            <div className={styles.UserStatisticsRightSideProblem}>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleCorrect}>1000</span></NavLink>
                            </div>
                        </UserStatisticsRightSideContainer>
                        <div className={styles.marginTop24}></div>
                        <UserStatisticsRightSideContainer title={'틀린 문제'}>
                            <div className={styles.UserStatisticsRightSideProblem}>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                                <NavLink to={'#'}><span className={styles.UserStatisticsLeftTitleWrong}>1000</span></NavLink>
                            </div>
                        </UserStatisticsRightSideContainer>
                    </div>
                </div>
            </main>
        </>
    )
}

export default User;