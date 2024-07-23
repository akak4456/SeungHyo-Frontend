import React from 'react';
import styled, { css } from 'styled-components';
import { useIsTablet } from '../hooks/media-query';
import Tag from '../components/tag';
import Dropdown from '../components/dropdown';
import RadioButton from '../components/button-radio';
import SourceEditor from '../components/editor-source';
import NormalButton from '../components/button-normal';
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
	width: 50%;
	margin-right: 24px;
	box-sizing: border-box;
	margin-top: 48px;
	${({ $isTablet }) =>
		$isTablet &&
		css`
			width: 100%;
			margin-right: 0;
		`}
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
const ProblemLeftSide = (props) => {
	// 이런 특수문자는 어떡하지? 입력 탭 같은 경우 말이야
	const example1Text = '1 2';
	const example2Text = '3';
	return (
		<ProblemLeftSideRootDiv $isTablet={props.isTablet}>
			<ProblemLeftSideMainTitle>1000번. A + B</ProblemLeftSideMainTitle>
			<Tag text={'성공'} backgroundColor={'#5CB85C'} marginLeft={'16px'} />
			<Tag text={'다국어'} backgroundColor={'#777777'} marginLeft={'16px'} />
			<ProblemTable>
				<tr>
					<th>시간 제한</th>
					<th>메모리 제한</th>
					<th>정답 비율</th>
				</tr>
				<tr>
					<td>2초</td>
					<td>128MB</td>
					<td>39.049%</td>
				</tr>
			</ProblemTable>
			<ProblemTab text={'문제'} />
			<ProblemLeftSideDivider></ProblemLeftSideDivider>
			<ProblemContent>
				두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.
			</ProblemContent>
			<ProblemTab text={'입력'} />
			<ProblemLeftSideDivider></ProblemLeftSideDivider>
			<ProblemContent>
				첫째 줄에 A와 B가 주어진다. (0 &lt; A, B &lt; 10)
			</ProblemContent>
			<ProblemTab text={'출력'} />
			<ProblemLeftSideDivider></ProblemLeftSideDivider>
			<ProblemContent>첫째 줄에 A+B를 출력한다.</ProblemContent>

			<ProblemTab text={'예제 입력 1'} copyText={example1Text} />
			<ProblemLeftSideDivider></ProblemLeftSideDivider>
			<ProblemExample>{example1Text}</ProblemExample>
			<ProblemTab text={'예제 출력 1'} copyText={example2Text} />
			<ProblemLeftSideDivider></ProblemLeftSideDivider>
			<ProblemExample>{example2Text}</ProblemExample>
			<ProblemTab text={'알고리즘 분류'} />
			<ProblemLeftSideDivider></ProblemLeftSideDivider>
			<ProblemKindList>
				<li>구현</li>
				<li>수학</li>
				<li>사칙연산</li>
			</ProblemKindList>
		</ProblemLeftSideRootDiv>
	);
};
const ProblemRightSideRootDiv = styled.div`
	width: 50%;
	margin-right: 24px;
	box-sizing: border-box;
	margin-top: 48px;
	${($isTablet) =>
		$isTablet &&
		css`
			width: 100%;
			margin-right: 0;
			margin-top: 24px;
		`};
`;
const ProblemRightSideTable = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 16px;
`;
const ProblemRightSideLeftTd = styled.td`
	white-space: nowrap;
	text-align: right;
	vertical-align: top;
	padding-top: 8px;
	color: var(--color-normal-text-color);
	font-size: 13px;
	font-weight: bold;
`;
const ProblemRightSideRightTd = styled.td`
	width: 100%;
	padding-left: 24px;
	& label {
		width: 100%;
		display: inline-block;
		margin-top: 16px;
	}
	& label:first-child {
		margin-top: 0px;
	}
	& label:last-child {
		padding-top: 8px;
	}
`;
const ProblemRightSide = (props) => {
	const dropDownText = ['JAVA', 'C', 'C++', '아희'];
	const onDropDownTextChange = (text) => {
		console.log(text);
	};
	return (
		<ProblemRightSideRootDiv $isTablet={props.isTablet}>
			<ProblemRightSideTable>
				<tr>
					<ProblemRightSideLeftTd>언어</ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<Dropdown
							isSearchIncluded={true}
							dropDownText={dropDownText}
							onDropDownTextChange={onDropDownTextChange}
						></Dropdown>
					</ProblemRightSideRightTd>
				</tr>
				<tr>
					<ProblemRightSideLeftTd>소스 코드 공개</ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<fieldset>
							<RadioButton text="공개" />
							<RadioButton text="비공개" />
							<RadioButton text="맞았을 때만 공개" />
						</fieldset>
					</ProblemRightSideRightTd>
				</tr>
				<tr>
					<ProblemRightSideLeftTd>소스 코드</ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<SourceEditor />
					</ProblemRightSideRightTd>
				</tr>
				<tr>
					<ProblemRightSideLeftTd></ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<NormalButton type="primary" text="제출하기"></NormalButton>
					</ProblemRightSideRightTd>
				</tr>
			</ProblemRightSideTable>
		</ProblemRightSideRootDiv>
	);
};
const ProblemRootMain = styled.main`
	display: flex;
	width: 75%;
	margin-left: 12.5%;
	margin-right: 12.5%;
	display: flex;
	flex-direction: ${({ $isTablet }) => ($isTablet ? 'column' : 'row')};
`;
const Problem = (props) => {
	const isTablet = useIsTablet();
	return (
		<ProblemRootMain $isTablet={isTablet}>
			<ProblemLeftSide isTablet={isTablet} />
			<ProblemRightSide isTablet={isTablet} />
		</ProblemRootMain>
	);
};
export default Problem;
