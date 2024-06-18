import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './user.module.css';
import Header from '../../header/header';
import {useMediaQuery} from 'react-responsive';
import { isMobileQuery } from '../../responsive';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import LineGraph from '../../common/graph/line-graph';
import PieGraph from '../../common/graph/pie-graph';
const UserStatisticsRightSideContainer = props => {
    return (
        <div className={styles.UserStatisticsRightSideContainerRoot}>
            <p className={styles.UserStatisticsRightSideTitle}>{props.title}</p>
            {props.children}
        </div>
    );
}
const User = () => {
    const transformLineGraphValue = (value) => {
        return (value * 100).toFixed(1) + "%";
    };
    const lineGraphContainerRef = useRef(null);
    const isMobile = useMediaQuery({
        query : isMobileQuery
    });
    useEffect(() => {
        // LineGraph 같은 경우 canvas 를 resize 하는 로직이 들어가 있습니다.
        // 그래서 lineGraphContainerRef.current.scrollLeft = lineGraphContainerRef.current.scrollWidth;
        // 만 하면 웹페이지를 새로 고침할 때 제대로 동작하지 않을 수도 있습니다.
        // 그래서 ResizeObserver 를 두어서 처리하였습니다.
        const observer = new ResizeObserver(entries => {
            lineGraphContainerRef.current.scrollLeft = lineGraphContainerRef.current.scrollWidth;
        });
        observer.observe(lineGraphContainerRef.current);

        return () => observer.disconnect();
    }, [/* 여기에 Canvas 업데이트를 트리거할 조건들 */]);
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
                        <div ref={lineGraphContainerRef} className={styles.UserStatisticsLeftRankGraph}>
                            <LineGraph getPointValueText={transformLineGraphValue} />
                        </div>
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
                        <div className={styles.UserStatisticsLeftRatioGraph}>
                            <PieGraph></PieGraph>
                        </div>
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