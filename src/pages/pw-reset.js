import React from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import { useIsMobile } from '../hooks/media-query';
import NormalButton from '../components/button-normal';
const PwResetInputTitle = styled.p`
	font-weight: bold;
	color: var(--color-gray);
	font-size: 13px;
	margin-top: 12px;
	margin-bottom: 6px;
`;
const PwResetButtonDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: 24px;
	& button {
		margin: auto;
	}
`;
const PwResetInner = () => {
	const onPwChangeClick = () => {};
	return (
		<>
			<PwResetInputTitle>새로운 비밀번호</PwResetInputTitle>
			<InputBox type="password"></InputBox>
			<PwResetInputTitle>새로운 비밀번호 확인</PwResetInputTitle>
			<InputBox type="password"></InputBox>
			<PwResetButtonDiv>
				<NormalButton
					type="primary"
					text="비밀번호 변경"
					onClick={onPwChangeClick}
				></NormalButton>
			</PwResetButtonDiv>
		</>
	);
};

const PwResetTitle = styled.p`
	padding-left: 12.5%;
	padding-top: 32px;
	padding-bottom: 32px;
	background-color: var(--color-top-title);
	font-size: 30px;
	color: var(--color-normal-text-color);
	border-bottom: 1px solid var(--color-white-gray);
`;

const PwResetRoot = styled.div`
	max-width: 600px;
	width: ${({ $isMobile }) => ($isMobile ? '75%' : '600px')};
	margin: auto;
	margin-top: 84px;
`;

const PwReset = () => {
	const isMobile = useIsMobile();
	return (
		<main>
			<PwResetTitle>비밀번호 초기화</PwResetTitle>
			<PwResetRoot $isMobile={isMobile}>
				<PwResetInner></PwResetInner>
			</PwResetRoot>
		</main>
	);
};

export default PwReset;
