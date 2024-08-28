import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { CaretDownFill } from 'react-bootstrap-icons';
import { getProblemGrade } from '../api/Submit';
import { useLocation } from 'react-router-dom';
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
	flex-shrink: 0;
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
const ReflectionNoteCaseBlock = ({
	caseNum,
	isCorrect,
	caseTitle,
	inputSource,
	outputSource,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<ReflectionNoteCaseBlockRootDiv>
			<ReflectionNoteCaseBlockTitleDiv onClick={() => setIsOpen(!isOpen)}>
				<p>
					<ReflectionNoteCaseBlockNum>
						CASE {caseNum}.
					</ReflectionNoteCaseBlockNum>
					<ReflectionNotCaseBlock $isCorrect={isCorrect}>
						{caseTitle}
					</ReflectionNotCaseBlock>
				</p>
				<ReflectionNoteCaseBlockFill
					$isOpen={isOpen}
				></ReflectionNoteCaseBlockFill>
			</ReflectionNoteCaseBlockTitleDiv>
			<ReflectionNoteCaseBlockExampleDiv $isOpen={isOpen}>
				<ReflectionExampleTab text={'입력'} copyText={inputSource} />
				<ReflectionNoteCaseBlockExampleDivider></ReflectionNoteCaseBlockExampleDivider>
				<ReflectionNoteCaseBlockExamplePre>
					{inputSource}
				</ReflectionNoteCaseBlockExamplePre>
				<ReflectionExampleTab text={'출력 '} copyText={outputSource} />
				<ReflectionNoteCaseBlockExampleDivider></ReflectionNoteCaseBlockExampleDivider>
				<ReflectionNoteCaseBlockExamplePre>
					{outputSource}
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
	const location = useLocation();
	// 경로를 '/'로 분할
	const parts = location.pathname.split('/');

	// 숫자 ID는 세 번째 부분에 위치
	const no = parts[2];
	const [compileData, setCompileData] = useState();
	const webSocket = useRef(null);
	useEffect(() => {
		getProblemGrade(
			no,
			(response) => {
				const data = response.data.data;
				setCompileData(data);
				if (data && data.kafkaCompiles && data.kafkaCompiles.length == 0) {
					// websocket 연결 & disconnect 되면 이유 불문 api 재 호출
					const WEBSOCKET_ENDPOINT = process.env.REACT_APP_WEB_SOCKET;
					webSocket.current = new WebSocket(
						WEBSOCKET_ENDPOINT + '/submit/' + no
					);
					webSocket.current.onopen = () => {
						console.log('WebSocket 연결!');
					};
					webSocket.current.onclose = (error) => {
						console.log('close:', error);
						getProblemGrade(
							no,
							(response) => {
								setCompileData(response.data.data);
							},
							(exception) => {}
						);
					};
					webSocket.current.onerror = (error) => {
						console.log('error:', error);
						getProblemGrade(
							no,
							(response) => {
								setCompileData(response.data.data);
							},
							(exception) => {}
						);
					};
					webSocket.current.onmessage = (event) => {
						const jsonObject = JSON.parse(event.data);
						if (
							jsonObject &&
							jsonObject.compileStatus &&
							jsonObject.compileStatus !== 'START_FOR_KAFKA'
						) {
							setCompileData((state) => ({
								...state,
								kafkaCompiles: [...state.kafkaCompiles, jsonObject],
							}));
						}
					};
				}
			},
			(exception) => {}
		);
		return () => {
			webSocket.current?.close();
		};
	}, []);
	const getCaseTitle = (compile) => {
		if (compile.compileStatus == 'CORRECT') {
			return '맞았습니다!!';
		} else if (compile.compileStatus == 'COMPILE_ERROR') {
			return '틀렸습니다(이유: 컴파일 에러)';
		} else if (compile.compileStatus == 'WRONG') {
			return '틀렸습니다';
		} else if (compile.compileStatus == 'RUNTIME_ERROR') {
			if (compile.runtimeErrorReason == 'TIMEOUT') {
				return '틀렸습니다(이유: 런타임 에러, 시간초과)';
			} else if (compile.runtimeErrorReason == 'MEMORY_EXCEED') {
				return '틀렸습니다(이유: 런타임 에러, 메모리초과)';
			} else {
				return '틀렸습니다(이유: 런타임 에러)';
			}
		}
		return '';
	};
	return (
		<ReflectionNoteRootMain>
			<ReflectionNoteTitle>
				{compileData && compileData.problemNo}번.{' '}
				{compileData && compileData.problemTitle}
				<sub>(제출번호:{no})</sub>
			</ReflectionNoteTitle>
			{compileData &&
				compileData.kafkaCompiles &&
				compileData.kafkaCompiles.map((compile) => {
					return (
						<ReflectionNoteCaseBlock
							key={compile.caseNo + 'compile'}
							caseNum={compile.caseNo}
							isCorrect={compile.compileStatus == 'CORRECT'}
							caseTitle={getCaseTitle(compile)}
							inputSource={
								compile.compileStatus == 'COMPILE_ERROR'
									? '컴파일 에러'
									: compile.inputSource
							}
							outputSource={
								compile.compileStatus == 'COMPILE_ERROR'
									? '컴파일 에러'
									: compile.outputSource
							}
						/>
					);
				})}
		</ReflectionNoteRootMain>
	);
};
export default ReflectionNote;
