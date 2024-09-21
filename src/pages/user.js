import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useIsTablet } from '../hooks/media-query';
import { NavLink, useSearchParams } from 'react-router-dom';
import LineGraph from '../components/graph-line';
import PieGraph from '../components/graph-pie';
import GrassGraph from '../components/graph-grass';
import { getSubmitStatistics } from '../api/Submit';
import { getInfo } from '../api/My';
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
const UserStatisticsGrassLinear = ({ maxCommitCount }) => {
	return (
		<UserStatisticsGrassLinearRootDiv>
			<UserStatisticsGrassLinearInnerDiv>
				<UserStatisticsGrassLinearTextDiv>
					<span>0</span>
					<span>{maxCommitCount}</span>
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
	const getGrassData = (year, commits) => {
		console.log(year, commits);
		const startDate = new Date(year, 0, 1); // 해당 연도의 1월 1일
		const endDate = new Date(year, 11, 31); // 해당 연도의 12월 31일
		const notValidData = { colorLevel: -1, date: startDate };

		const weeks = [];
		let currentWeek = [];

		let currentDate = new Date(startDate);

		// Prepare a map for easy lookup of commit counts by date
		const commitMap = {};
		commits.forEach((commit) => {
			const dateKey = new Date(commit.submitDate).toISOString().split('T')[0]; // Use only the date part
			commitMap[dateKey] = commit.submitCount;
		});

		// 시작 주
		for (let i = 0; i < currentDate.getDay(); i++) {
			currentWeek.push(notValidData);
		}
		for (let i = currentDate.getDay(); i < 7; i++) {
			const d = new Date(currentDate);
			d.setDate(d.getDate() + 1);
			const dateKey = d.toISOString().split('T')[0];
			const colorLevel =
				commitMap[dateKey] !== undefined ? commitMap[dateKey] : 0;
			currentWeek.push({
				colorLevel: colorLevel,
				date: new Date(currentDate),
			});
			currentDate.setDate(currentDate.getDate() + 1);
		}
		weeks.push(currentWeek);

		// 중간 주들
		while (currentDate <= endDate) {
			currentWeek = [];
			for (let i = 0; i < 7; i++) {
				const d = new Date(currentDate);
				d.setDate(d.getDate() + 1);
				const dateKey = d.toISOString().split('T')[0];
				const colorLevel =
					commitMap[dateKey] !== undefined ? commitMap[dateKey] : 0;
				console.log(dateKey, currentDate, colorLevel);
				currentWeek.push(
					currentDate <= endDate
						? {
								colorLevel: colorLevel,
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
		console.log(weeks);
		return weeks;
	};
	const transformLineGraphValue = (value) => {
		return (value * 100).toFixed(1) + '%';
	};
	const lineGraphContainerRef = useRef(null);
	const isTablet = useIsTablet();
	const [searchParams, setSearchParams] = useSearchParams();
	const [info, setInfo] = useState();
	const [statistics, setStatistics] = useState();
	const memberId = searchParams.get('memberId');
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
	const monthToString = (month) => {
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		return monthNames[month - 1]; // month is 1-indexed
	};
	useEffect(() => {
		getInfo(
			memberId,
			(response) => {
				setInfo(response.data.data);
			},
			(error) => {
				console.log(error);
			}
		);
		getSubmitStatistics(
			memberId,
			(response) => {
				console.log(response.data.data);
				// Sort the ratioInCurrentYear by year and month
				const sortedRatios = response.data.data.ratioInCurrentYear.sort(
					(a, b) => {
						if (a.year === b.year) {
							return a.month - b.month; // Sort by month if years are equal
						}
						return a.year - b.year; // Sort by year
					}
				);

				// Transform the sorted data to include xLabel and value
				const transformedRatios = sortedRatios.map((item) => ({
					xLabel: monthToString(item.month), // Convert month to string
					value: item.ratio, // Convert ratio to percentage
				}));

				// Get commit with maximum submitCount
				console.log(response.data.data.commits);
				const maxCommitCount = response.data.data.commits.reduce(
					(max, commit) => {
						return commit.submitCount > max.submitCount ? commit : max;
					},
					response.data.data.commits[0]
				).submitCount;

				const lastCommits = response.data.data.commits.filter((commit) => {
					const commitYear = new Date(commit.submitDate).getFullYear();
					return commitYear === new Date().getFullYear() - 1;
				});

				const currentCommits = response.data.data.commits.filter((commit) => {
					const commitYear = new Date(commit.submitDate).getFullYear();
					return commitYear === new Date().getFullYear();
				});

				// Update the state with transformed statistics
				setStatistics({
					...response.data.data,
					ratioInCurrentYear: transformedRatios,
					maxCommitCount: maxCommitCount,
					lastCommits: lastCommits,
					currentCommits: currentCommits,
				});
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);
	return (
		<UserRootMain>
			{info && <UserName>{info.memberId}</UserName>}
			{info && <UserMessage>{info.statusMessage}</UserMessage>}
			<UserTopDiv></UserTopDiv>
			<UserStatisticsRootDiv $isTablet={isTablet}>
				<UserStatisticsLeftDiv $isTablet={isTablet}>
					<UserDiv></UserDiv>
					<UserStatisticsLeftRankGraphDiv ref={lineGraphContainerRef}>
						{statistics && statistics.ratioInCurrentYear && (
							<LineGraph data={statistics.ratioInCurrentYear} />
						)}
					</UserStatisticsLeftRankGraphDiv>
					<UserDiv $isMarginTop={true}></UserDiv>
					{statistics && (
						<UserStatisticsLeftRowDiv>
							<UserStatisticsLeftTitle $isCorrect={true}>
								맞았습니다
							</UserStatisticsLeftTitle>
							<UserStatisticsLeftContent>
								{statistics.rightCount}
							</UserStatisticsLeftContent>
						</UserStatisticsLeftRowDiv>
					)}
					<UserDiv></UserDiv>
					{statistics && (
						<UserStatisticsLeftRowDiv>
							<UserStatisticsLeftTitle $isWrong={true}>
								틀렸습니다
							</UserStatisticsLeftTitle>
							<UserStatisticsLeftContent>
								{statistics.wrongCount}
							</UserStatisticsLeftContent>
						</UserStatisticsLeftRowDiv>
					)}

					<UserDiv></UserDiv>
					{statistics && (
						<UserStatisticsLeftRatioGraphDiv>
							<PieGraph
								rightCount={statistics.rightCount}
								wrongCount={statistics.wrongCount}
							></PieGraph>
						</UserStatisticsLeftRatioGraphDiv>
					)}
				</UserStatisticsLeftDiv>
				<UserStatisticsRightSideDiv $isTablet={isTablet}>
					{statistics && (
						<UserStatisticsRightSideContainer
							title={`${new Date().getFullYear() - 1} ~ ${new Date().getFullYear()}년`}
						>
							<UserStatisticsRightSideDailyDiv>
								<UserStatisticsGrassLinear
									maxCommitCount={statistics.maxCommitCount}
								/>
								<GrassGraph
									year={new Date().getFullYear() - 1}
									data={getGrassData(
										new Date().getFullYear() - 1,
										statistics.lastCommits
									)}
								/>
								<UserGrassGraphMarginDiv />
								<GrassGraph
									year={new Date().getFullYear()}
									data={getGrassData(
										new Date().getFullYear(),
										statistics.currentCommits
									)}
								/>
								<UserGrassGraphMarginDiv />
							</UserStatisticsRightSideDailyDiv>
						</UserStatisticsRightSideContainer>
					)}

					<UserMarginTop24Div></UserMarginTop24Div>
					<UserStatisticsRightSideContainer title={'맞은 문제'}>
						<UserStatisticsRightSideProblemDiv>
							{statistics &&
								statistics.rightProblemNo &&
								statistics.rightProblemNo.map((no) => (
									<NavLink to={`/problem/${no}`}>
										<UserStatisticsRightProblemLink $isCorrect={true}>
											{no}
										</UserStatisticsRightProblemLink>
									</NavLink>
								))}
						</UserStatisticsRightSideProblemDiv>
					</UserStatisticsRightSideContainer>
					<UserMarginTop24Div></UserMarginTop24Div>
					<UserStatisticsRightSideContainer title={'틀린 문제'}>
						<UserStatisticsRightSideProblemDiv>
							{statistics &&
								statistics.wrongProblemNo &&
								statistics.wrongProblemNo.map((no) => (
									<NavLink to={`/problem/${no}`}>
										<UserStatisticsRightProblemLink $isWrong={true}>
											{no}
										</UserStatisticsRightProblemLink>
									</NavLink>
								))}
						</UserStatisticsRightSideProblemDiv>
					</UserStatisticsRightSideContainer>
				</UserStatisticsRightSideDiv>
			</UserStatisticsRootDiv>
		</UserRootMain>
	);
};

export default User;
