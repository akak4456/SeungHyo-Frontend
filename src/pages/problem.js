import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tag from '../components/tag';
import NormalButton from '../components/button-normal';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProblem } from '../api/Problem';
const ProblemTabDiv = styled.div`
	margin-top: 16px;
	box-sizing: border-box;
	& span {
		display: inline-block;
		padding-bottom: 8px;
		border-bottom: 2px solid var(--color-primary);
		font-size: 22px;
		color: var(--color-normal-text-color);
	}
	& a {
		display: inline-block;
		font-size: 13px;
		text-decoration: none;
		color: var(--color-primary);
	}
	& a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;
const ProblemTab = (props) => {
	const copyFn = async (event) => {
		event.preventDefault();
		var preText = props.copyText;

		try {
			// Clipboard API를 사용하여 텍스트를 클립보드에 복사
			await navigator.clipboard.writeText(preText);
		} catch (err) {
			// 에러가 발생하면 사용자에게 알림
			console.error('Failed to copy: ', err);
			alert('Failed to copy text.');
		}
	};
	return (
		<ProblemTabDiv>
			<span>
				{props.text} {props.copyText && <a onClick={copyFn}>복사</a>}
			</span>
		</ProblemTabDiv>
	);
};
const ProblemLeftSideRootDiv = styled.div`
	width: 100%;
	margin-right: 24px;
	box-sizing: border-box;
	margin-top: 48px;
`;
const ProblemLeftSideMainTitle = styled.p`
	color: var(--color-normal-text-color);
	font-size: 28px;
	display: inline-block;
`;
const ProblemTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 16px;
	& th {
		text-align: left;
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 16px;
	}
	& td {
		text-align: left;
		padding-top: 8px;
		padding-left: 16px;
	}
	& tr {
		border: 1px solid var(--color-white-gray);
		border-left: 0;
		border-right: 0;
	}
	& tr:last-child {
		border-bottom: 0;
	}
`;
const ProblemLeftSideDivider = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
`;
const ProblemContent = styled.p`
	margin-top: 16px;
	font-size: 16px;
	color: var(--color-problem-text);
`;
const ProblemExample = styled.pre`
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
	border: 1px solid var(--color-white-gray);
	margin-top: 16px;
	font: inherit;
	background-color: var(--color-example);
`;
const ProblemKindList = styled.ul`
	list-style-type: disc;
	box-sizing: border-box;
	padding-left: 24px;
	padding-top: 8px;
	& li {
		height: auto;
		font-size: 16px;
		line-height: 23px;
	}
`;
const ProblemLeftSide = ({ problem, problemNo }) => {
	console.log(problem);
	let timeCondition = '';
	if (problem) {
		if (problem.problemCondition.length == 1) {
			timeCondition = problem.problemCondition[0].conditionTime + '초';
		} else {
			timeCondition =
				problem.problemCondition[0].conditionTime + '초(언어별 상이)';
		}
	}
	let memoryCondition = '';
	if (problem) {
		if (problem.problemCondition.length == 1) {
			memoryCondition = problem.problemCondition[0].conditionMemory + 'MB';
		} else {
			memoryCondition =
				problem.problemCondition[0].conditionMemory + 'MB(언어별 상이)';
		}
	}
	return (
		<ProblemLeftSideRootDiv>
			{problem && (
				<>
					<ProblemLeftSideMainTitle>
						{problemNo}번. {problem.problemTitle}
					</ProblemLeftSideMainTitle>
					{problem.problemTags.map((tag) => (
						<Tag
							key={tag.tagName}
							text={tag.tagName}
							backgroundColor={tag.backgroundColor}
							marginLeft={'16px'}
						/>
					))}
					<ProblemTable>
						<tr>
							<th>시간 제한</th>
							<th>메모리 제한</th>
							<th>정답 비율</th>
						</tr>
						<tr>
							<td>{timeCondition}</td>
							<td>{memoryCondition}</td>
							<td>{problem.correctRatio * 100}%</td>
						</tr>
					</ProblemTable>
					<ProblemTab text={'문제'} />
					<ProblemLeftSideDivider></ProblemLeftSideDivider>
					<ProblemContent>{problem.problemExplain}</ProblemContent>
					<ProblemTab text={'입력'} />
					<ProblemLeftSideDivider></ProblemLeftSideDivider>
					<ProblemContent>{problem.problemInputExplain}</ProblemContent>
					<ProblemTab text={'출력'} />
					<ProblemLeftSideDivider></ProblemLeftSideDivider>
					<ProblemContent>{problem.problemOutputExplain}</ProblemContent>
					{[...Array(problem.problemInput.length).keys()].map((idx) => {
						return (
							<>
								<ProblemTab
									key={idx + 'exampleintab'}
									text={'예제 입력 ' + (idx + 1)}
									copyText={problem.problemInput[idx]}
								/>
								<ProblemLeftSideDivider
									key={idx + 'div1'}
								></ProblemLeftSideDivider>
								<ProblemExample>{problem.problemInput[idx]}</ProblemExample>
								<ProblemTab
									key={idx + 'exampleouttab'}
									text={'예제 출력 ' + (idx + 1)}
									copyText={problem.problemOutput[idx]}
								/>
								<ProblemLeftSideDivider
									key={idx + 'div2'}
								></ProblemLeftSideDivider>
								<ProblemExample>{problem.problemOutput[idx]}</ProblemExample>
							</>
						);
					})}
					<ProblemTab text={'알고리즘 분류'} />
					<ProblemLeftSideDivider></ProblemLeftSideDivider>
					<ProblemKindList>
						{problem.algorithmCategory.map((algorithm) => (
							<li key={algorithm.algorithmName}>{algorithm.algorithmName}</li>
						))}
					</ProblemKindList>
				</>
			)}
		</ProblemLeftSideRootDiv>
	);
};

const ProblemRootMain = styled.main`
	display: flex;
	width: 75%;
	margin-left: 12.5%;
	margin-right: 12.5%;
	display: flex;
	flex-direction: column;
`;
const SubmitButtonDiv = styled.div`
	margin: auto;
	margin-top: 24px;
`;
const Problem = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	// 경로를 '/'로 분할
	const parts = location.pathname.split('/');

	// 숫자 ID는 세 번째 부분에 위치
	const id = parts[2];

	const [problem, setProblem] = useState();

	useEffect(() => {
		getProblem(id, (data) => {
			setProblem(data);
		});
	}, []);

	return (
		<ProblemRootMain>
			<ProblemLeftSide problem={problem} problemNo={id} />
			<SubmitButtonDiv>
				<NormalButton
					type="primary"
					text="제출하기"
					onClick={() => navigate('/submit/add/' + id)}
				/>
			</SubmitButtonDiv>
		</ProblemRootMain>
	);
};
export default Problem;
