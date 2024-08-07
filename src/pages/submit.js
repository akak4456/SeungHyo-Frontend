import React from 'react';
import styled, { css } from 'styled-components';
import SourceEditor from '../components/editor-source';
import NormalButton from '../components/button-normal';
import RadioButton from '../components/button-radio';
import Dropdown from '../components/dropdown';

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

const SubmitRootMain = styled.main`
	width: 75%;
	margin: auto;
	display: flex;
	margin-top: 48px;
`;
const Submit = ({ isNew }) => {
	console.log(isNew);
	return <SubmitRootMain></SubmitRootMain>;
};

export default Submit;
