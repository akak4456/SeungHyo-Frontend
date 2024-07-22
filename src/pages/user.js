import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useIsTablet } from '../hooks/media-query';
import { NavLink } from 'react-router-dom';
import LineGraph from '../components/graph-line';
import PieGraph from '../components/graph-pie';
import GrassGraph from '../components/graph-grass';
const UserStatisticsRightSideContainerRootDiv = styled.div`
	width: 100%;
	border: 1px solid var(--color-white-gray);
`;
const UserStatisticsRightSideTitle = styled.p`
	background-color: var(--color-block-title-background);
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 9px;
	padding-bottom: 9px;
	font-size: 18px;
	color: var(--color-normal-text-color);
	border-bottom: 1px solid var(--color-white-gray);
`;
const UserStatisticsRightSideContainer = (props) => {
	return (
		<UserStatisticsRightSideContainerRootDiv>
			<UserStatisticsRightSideTitle>{props.title}</UserStatisticsRightSideTitle>
			{props.children}
		</UserStatisticsRightSideContainerRootDiv>
	);
};
const UserStatisticsGrassLinearRootDiv = styled.div`
	width: 100%;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
	display: flex;
	box-sizing: border-box;
`;
const UserStatisticsGrassLinearInnerDiv = styled.div`
	margin-left: auto;
	width: 100px;
`;
const UserStatisticsGrassLinearTextDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	& span {
		font-size: 10px;
		color: #dfdfdf;
	}
`;
const UserStatisticsGrassLinearBoxDiv = styled.div`
	width: 100%;
	height: 12px;
	box-sizing: border-box;
	border: 1px solid #dfdfdf;
	background: linear-gradient(to right, rgb(162, 238, 151), rgb(0, 152, 116));
`;
const UserStatisticsGrassLinear = (props) => {
	return (
		<UserStatisticsGrassLinearRootDiv>
			<UserStatisticsGrassLinearInnerDiv>
				<UserStatisticsGrassLinearTextDiv>
					<span>0</span>
					<span>14</span>
				</UserStatisticsGrassLinearTextDiv>
				<UserStatisticsGrassLinearBoxDiv></UserStatisticsGrassLinearBoxDiv>
			</UserStatisticsGrassLinearInnerDiv>
		</UserStatisticsGrassLinearRootDiv>
	);
};
const UserRootMain = styled.main`
	width: 75%;
	margin: auto;
	margin-top: 48px;
`;
const UserName = styled.p`
	color: var(--color-normal-text-color);
	font-size: 28px;
`;
const UserMessage = styled.blockquote`
	padding: 16px;
	border-left: 2px solid var(--color-white-gray);
	font-size: 17.5px;
	margin-top: 16px;
	transition: 0.5s;
	&:hover {
		border-left-color: var(--color-primary);
	}
`;
const UserTopDiv = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
	margin-top: 96px;
`;
const UserStatisticsRootDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: ${({ $isTablet }) => ($isTablet ? 'column' : 'row')};
	margin-top: 24px;
`;
const UserStatisticsLeftDiv = styled.div`
	width: ${({ $isTablet }) => ($isTablet ? '100%' : '300px')};
	flex-shrink: 0;
`;
const UserDiv = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
	${({ $isMarginTop }) =>
		$isMarginTop &&
		css`
			margin-top: 24px;
		`}
`;
const UserStatisticsLeftRowDiv = styled.div`
	display: flex;
	width: 100%;
	padding-top: 12px;
	padding-bottom: 12px;
`;
const UserStatisticsLeftTitle = styled.p`
	width: 67%;
	display: inline-block;
	color: var(--color-normal-text-color);
	font-weight: bold;
	font-size: 14px;
	${({ $isCorrect }) =>
		$isCorrect &&
		css`
			color: var(--color-correct);
		`}
	${({ $isWrong }) =>
		$isWrong &&
		css`
			color: var(--color-wrong);
		`}
`;
const UserStatisticsLeftContent = styled.p`
	width: 33%;
	display: inline-block;
	display: inline-block;
	color: var(--color-normal-text-color);
	font-size: 14px;
`;
const UserStatisticsLeftRankGraphDiv = styled.div`
	width: 100%;
	border-bottom: 1px solid var(--color-white-gray);
	overflow-x: scroll;
	white-space: nowrap;
`;
const UserStatisticsLeftRatioGraphDiv = styled.div`
	width: 100%;
	height: 300px;
	text-align: center;
	padding-top: 50px;
`;
const UserStatisticsRightSideDiv = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: auto;
	margin-left: ${({ $isTablet }) => ($isTablet ? '0' : '24px')};
	${(props) =>
		props.isTablet &&
		css`
			margin-top: 24px;
		`}
`;
const UserStatisticsRightSideDailyDiv = styled.div`
	width: 100%;
	overflow-x: auto;
`;
const UserGrassGraphMarginDiv = styled.div`
	height: 16px;
	width: 100%;
`;
const UserMarginTop24Div = styled.div`
	width: 100%;
	margin-top: 24px;
`;
const UserStatisticsRightProblemLink = styled.span`
	${({ $isCorrect }) =>
		$isCorrect &&
		css`
			color: var(--color-correct);
		`}
	${({ $isWrong }) =>
		$isWrong &&
		css`
			color: var(--color-wrong);
		`}
`;
const UserStatisticsRightSideProblemDiv = styled.div`
	width: 100%;
	padding: 8px;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	& a {
		text-decoration: none;
		font-size: 12px;
		font-weight: bold;
		padding: 8px;
	}
`;
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
	const isTablet = useIsTablet();
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
		<UserRootMain>
			<UserName>akak4456</UserName>
			<UserMessage>컴공 17 조승효</UserMessage>
			<UserTopDiv></UserTopDiv>
			<UserStatisticsRootDiv $isTablet={isTablet}>
				<UserStatisticsLeftDiv $isTablet={isTablet}>
					<UserDiv></UserDiv>
					<UserStatisticsLeftRowDiv>
						<UserStatisticsLeftTitle>등수</UserStatisticsLeftTitle>
						<UserStatisticsLeftContent>4579</UserStatisticsLeftContent>
					</UserStatisticsLeftRowDiv>
					<UserDiv></UserDiv>
					<UserStatisticsLeftRankGraphDiv ref={lineGraphContainerRef}>
						<LineGraph getPointValueText={transformLineGraphValue} />
					</UserStatisticsLeftRankGraphDiv>
					<UserDiv $isMarginTop={true}></UserDiv>
					<UserStatisticsLeftRowDiv>
						<UserStatisticsLeftTitle $isCorrect={true}>
							맞았습니다
						</UserStatisticsLeftTitle>
						<UserStatisticsLeftContent>4579</UserStatisticsLeftContent>
					</UserStatisticsLeftRowDiv>
					<UserDiv></UserDiv>
					<UserStatisticsLeftRowDiv>
						<UserStatisticsLeftTitle $isWrong={true}>
							틀렸습니다
						</UserStatisticsLeftTitle>
						<UserStatisticsLeftContent>4579</UserStatisticsLeftContent>
					</UserStatisticsLeftRowDiv>
					<UserDiv></UserDiv>
					<UserStatisticsLeftRatioGraphDiv>
						<PieGraph></PieGraph>
					</UserStatisticsLeftRatioGraphDiv>
				</UserStatisticsLeftDiv>
				<UserStatisticsRightSideDiv $isTablet={isTablet}>
					<UserStatisticsRightSideContainer title={'2023 ~ 2024년'}>
						<UserStatisticsRightSideDailyDiv>
							<UserStatisticsGrassLinear maxLevel={14} />
							<GrassGraph year={2023} data={getTempData(2023)} />
							<UserGrassGraphMarginDiv />
							<GrassGraph year={2024} data={getTempData(2024)} />
							<UserGrassGraphMarginDiv />
						</UserStatisticsRightSideDailyDiv>
					</UserStatisticsRightSideContainer>
					<UserMarginTop24Div></UserMarginTop24Div>
					<UserStatisticsRightSideContainer title={'맞은 문제'}>
						<UserStatisticsRightSideProblemDiv>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isCorrect={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
						</UserStatisticsRightSideProblemDiv>
					</UserStatisticsRightSideContainer>
					<UserMarginTop24Div></UserMarginTop24Div>
					<UserStatisticsRightSideContainer title={'틀린 문제'}>
						<UserStatisticsRightSideProblemDiv>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
							<NavLink to={'#'}>
								<UserStatisticsRightProblemLink $isWrong={true}>
									1000
								</UserStatisticsRightProblemLink>
							</NavLink>
						</UserStatisticsRightSideProblemDiv>
					</UserStatisticsRightSideContainer>
				</UserStatisticsRightSideDiv>
			</UserStatisticsRootDiv>
		</UserRootMain>
	);
};

export default User;
