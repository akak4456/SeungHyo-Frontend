import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { CaretDownFill } from 'react-bootstrap-icons';
const ReflectionExampleTabDiv = styled.div`
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
const ReflectionExampleTab = (props) => {
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
		<ReflectionExampleTabDiv>
			<span>
				{props.text} {props.copyText && <a onClick={copyFn}>복사</a>}
			</span>
		</ReflectionExampleTabDiv>
	);
};
const ReflectionNoteCaseBlockRootDiv = styled.div`
	box-sizing: border-box;
	width: 100%;
	border: 1px solid var(--color-white-gray);
	border-bottom: 0;
	&:last-child {
		border-bottom: 1px solid var(--color-white-gray);
	}
`;
const ReflectionNoteCaseBlockTitleDiv = styled.div`
	width: 100%;
	display: flex;
	padding: 16px;
	box-sizing: border-box;
	justify-content: space-between;
	& p {
		display: inline-block;
		margin-top: auto;
		margin-bottom: auto;
	}
`;
const ReflectionNoteCaseBlockNum = styled.span`
	font-size: 20px;
	color: var(--color-normal-text-color);
	font-weight: bold;
`;
const ReflectionNotCaseBlock = styled.span`
	font-size: 20px;
	color: ${({ $isCorrect }) =>
		$isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)'};
	font-weight: bold;
`;
const ReflectionNoteCaseBlockFill = styled(CaretDownFill)`
	transition: 0.5s;
	margin-top: auto;
	margin-bottom: auto;
	${({ $isOpen }) =>
		$isOpen &&
		css`
			transform: rotate(180deg);
		`}
`;
const ReflectionNoteCaseBlockExampleDiv = styled.div`
	border-top: 1px solid var(--color-white-gray);
	transition: 0.5s;
	overflow: hidden;

	${({ $isOpen }) =>
		$isOpen
			? css`
					opacity: 1;
					padding-left: 16px;
					padding-right: 16px;
					padding-bottom: 16px;
				`
			: css`
					height: 0;
					opacity: 0;
					padding: 0;
				`}
`;
const ReflectionNoteCaseBlockExampleDivider = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
`;
const ReflectionNoteCaseBlockExamplePre = styled.pre`
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
	border: 1px solid var(--color-white-gray);
	margin-top: 16px;
	font: inherit;
	background-color: var(--color-example);
`;
const ReflectionNoteCaseBlock = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const example1Text = '1 2';
	const example2Text = '3';
	return (
		<ReflectionNoteCaseBlockRootDiv>
			<ReflectionNoteCaseBlockTitleDiv onClick={() => setIsOpen(!isOpen)}>
				<p>
					<ReflectionNoteCaseBlockNum>
						CASE {props.caseNum}.
					</ReflectionNoteCaseBlockNum>
					<ReflectionNotCaseBlock $isCorrect={props.isCorrect}>
						{props.caseTitle}
					</ReflectionNotCaseBlock>
				</p>
				<ReflectionNoteCaseBlockFill
					$isOpen={isOpen}
				></ReflectionNoteCaseBlockFill>
			</ReflectionNoteCaseBlockTitleDiv>
			<ReflectionNoteCaseBlockExampleDiv $isOpen={isOpen}>
				<ReflectionExampleTab text={'입력'} copyText={example1Text} />
				<ReflectionNoteCaseBlockExampleDivider></ReflectionNoteCaseBlockExampleDivider>
				<ReflectionNoteCaseBlockExamplePre>
					{example1Text}
				</ReflectionNoteCaseBlockExamplePre>
				<ReflectionExampleTab text={'출력 '} copyText={example2Text} />
				<ReflectionNoteCaseBlockExampleDivider></ReflectionNoteCaseBlockExampleDivider>
				<ReflectionNoteCaseBlockExamplePre>
					{example2Text}
				</ReflectionNoteCaseBlockExamplePre>
			</ReflectionNoteCaseBlockExampleDiv>
		</ReflectionNoteCaseBlockRootDiv>
	);
};
const ReflectionNoteRootMain = styled.main`
	width: 75%;
	margin-left: 12.5%;
	margin-top: 48px;
`;
const ReflectionNoteTitle = styled.p`
	font-size: 28px;
	color: var(--color-normal-text-color);
	margin-bottom: 24px;
	& sub {
		font-size: 11px;
	}
`;
const ReflectionNote = (props) => {
	return (
		<ReflectionNoteRootMain>
			<ReflectionNoteTitle>
				1000번. A + B<sub>(제출번호:1000)</sub>
			</ReflectionNoteTitle>
			<ReflectionNoteCaseBlock
				caseNum={1}
				caseTitle={'맞았습니다'}
				isCorrect={true}
			/>
			<ReflectionNoteCaseBlock
				caseNum={2}
				caseTitle={'맞았습니다'}
				isCorrect={true}
			/>
			<ReflectionNoteCaseBlock
				caseNum={3}
				caseTitle={'틀렸습니다(이유:런타임 에러)'}
				isCorrect={false}
			/>
		</ReflectionNoteRootMain>
	);
};
export default ReflectionNote;
