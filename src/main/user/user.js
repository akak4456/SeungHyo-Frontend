import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './user.module.css';
import { useMediaQuery } from 'react-responsive';
import { isTabletQuery } from '../../responsive';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import LineGraph from '../../components/graph-line';
import PieGraph from '../../components/graph-pie';
import GrassGraph from '../../components/graph-grass';
const UserStatisticsRightSideContainer = (props) => {
	return (
		<div className={styles.UserStatisticsRightSideContainerRoot}>
			<p className={styles.UserStatisticsRightSideTitle}>{props.title}</p>
			{props.children}
		</div>
	);
};
const UserStatisticsGrassLinear = (props) => {
	return (
		<div className={styles.UserStatisticsGrassLinearRoot}>
			<div className={styles.UserStatisticsGrassLinearInner}>
				<div className={styles.UserStatisticsGrassLinearText}>
					<span>0</span>
					<span>14</span>
				</div>
				<div className={styles.UserStatisticsGrassLinearBox}></div>
			</div>
		</div>
	);
};
const User = () => {
	const getTempData = (year) => {
		const startDate = new Date(year, 0, 1); // 해당 연도의 1월 1일
		const endDate = new Date(year, 11, 31); // 해당 연도의 12월 31일
		const notValidData = { colorLevel: -1, date: startDate };

		const weeks = [];
		let currentWeek = [];

		let currentDate = new Date(startDate);

		// 시작 주
		for (let i = 0; i < currentDate.getDay(); i++) {
			currentWeek.push(notValidData);
		}
		for (let i = currentDate.getDay(); i < 7; i++) {
			currentWeek.push({
				colorLevel: Math.floor(Math.random() * 15),
				date: new Date(currentDate),
			});
			currentDate.setDate(currentDate.getDate() + 1);
		}
		weeks.push(currentWeek);

		// 중간 주들
		while (currentDate <= endDate) {
			currentWeek = [];
			for (let i = 0; i < 7; i++) {
				currentWeek.push(
					currentDate <= endDate
						? {
								colorLevel: Math.floor(Math.random() * 15),
								date: new Date(currentDate),
							}
						: notValidData
				);
				currentDate.setDate(currentDate.getDate() + 1);
			}
			weeks.push(currentWeek);
		}

		// 마지막 주
		if (currentWeek.length < 7) {
			while (currentWeek.length < 7) {
				currentWeek.push(notValidData);
			}
		}

		return weeks;
	};
	const transformLineGraphValue = (value) => {
		return (value * 100).toFixed(1) + '%';
	};
	const lineGraphContainerRef = useRef(null);
	const isMobile = useMediaQuery({
		query: isTabletQuery,
	});
	useEffect(
		() => {
			// LineGraph 같은 경우 canvas 를 resize 하는 로직이 들어가 있습니다.
			// 그래서 lineGraphContainerRef.current.scrollLeft = lineGraphContainerRef.current.scrollWidth;
			// 만 하면 웹페이지를 새로 고침할 때 제대로 동작하지 않을 수도 있습니다.
			// 그래서 ResizeObserver 를 두어서 처리하였습니다.
			const observer = new ResizeObserver((entries) => {
				lineGraphContainerRef.current.scrollLeft =
					lineGraphContainerRef.current.scrollWidth;
			});
			observer.observe(lineGraphContainerRef.current);

			return () => observer.disconnect();
		},
		[
			/* 여기에 Canvas 업데이트를 트리거할 조건들 */
		]
	);
	return (
		<main className={styles.UserRoot}>
			<p className={styles.UserName}>akak4456</p>
			<blockquote className={styles.UserMessage}>컴공 17 조승효</blockquote>
			<div className={styles.UserDivTop}></div>
			<div
				className={classNames(styles.UserStatisticsRoot, {
					[styles.UserStatisticsRootMobile]: isMobile,
				})}
			>
				<div
					className={classNames(styles.UserStatisticsLeft, {
						[styles.UserStatisticsLeftMobile]: isMobile,
					})}
				>
					<div className={styles.UserDiv}></div>
					<div className={styles.UserStatisticsLeftRow}>
						<p className={classNames(styles.UserStatisticsLeftTitle)}>등수</p>
						<p className={styles.UserStatisticsLeftContent}>4579</p>
					</div>
					<div className={styles.UserDiv}></div>
					<div
						ref={lineGraphContainerRef}
						className={styles.UserStatisticsLeftRankGraph}
					>
						<LineGraph getPointValueText={transformLineGraphValue} />
					</div>
					<div
						className={classNames(styles.UserDiv, styles.UserDivMarginTop24)}
					></div>
					<div className={styles.UserStatisticsLeftRow}>
						<p
							className={classNames(
								styles.UserStatisticsLeftTitle,
								styles.UserStatisticsLeftTitleCorrect
							)}
						>
							맞았습니다
						</p>
						<p className={styles.UserStatisticsLeftContent}>4579</p>
					</div>
					<div className={styles.UserDiv}></div>
					<div className={styles.UserStatisticsLeftRow}>
						<p
							className={classNames(
								styles.UserStatisticsLeftTitle,
								styles.UserStatisticsLeftTitleWrong
							)}
						>
							틀렸습니다
						</p>
						<p className={styles.UserStatisticsLeftContent}>4579</p>
					</div>
					<div className={styles.UserDiv}></div>
					<div className={styles.UserStatisticsLeftRatioGraph}>
						<PieGraph></PieGraph>
					</div>
				</div>
				<div
					className={classNames(styles.UserStatisticsRightSide, {
						[styles.UserStatisticsRightSideMobile]: isMobile,
					})}
				>
					<UserStatisticsRightSideContainer title={'2023 ~ 2024년'}>
						<div className={styles.UserStatisticsRightSideDaily}>
							<UserStatisticsGrassLinear maxLevel={14} />
							<GrassGraph year={2023} data={getTempData(2023)} />
							<div className={styles.UserGrassGraphMargin} />
							<GrassGraph year={2024} data={getTempData(2024)} />
							<div className={styles.UserGrassGraphMargin} />
						</div>
					</UserStatisticsRightSideContainer>
					<div className={styles.marginTop24}></div>
					<UserStatisticsRightSideContainer title={'맞은 문제'}>
						<div className={styles.UserStatisticsRightSideProblem}>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleCorrect}>
									1000
								</span>
							</NavLink>
						</div>
					</UserStatisticsRightSideContainer>
					<div className={styles.marginTop24}></div>
					<UserStatisticsRightSideContainer title={'틀린 문제'}>
						<div className={styles.UserStatisticsRightSideProblem}>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
							<NavLink to={'#'}>
								<span className={styles.UserStatisticsLeftTitleWrong}>
									1000
								</span>
							</NavLink>
						</div>
					</UserStatisticsRightSideContainer>
				</div>
			</div>
		</main>
	);
};

export default User;
