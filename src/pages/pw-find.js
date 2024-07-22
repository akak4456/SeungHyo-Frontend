import React from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { useIsMobile } from '../hooks/media-query';
const PwFindInputTitle = styled.p`
	font-weight: bold;
	color: var(--color-gray);
	font-size: 13px;
	margin-top: 12px;
	margin-bottom: 6px;
`;
const PwFindButton = styled.div`
	width: 100%;
	display: flex;
	margin-top: 24px;
	& button {
		margin: auto;
	}
`;
function PwFindInner() {
	const onPwFindClick = () => {
		// TODO 이메일을 보내도록 해라
	};
	return (
		<>
			<PwFindInputTitle>아이디</PwFindInputTitle>
			<InputBox type="text"></InputBox>
			<PwFindButton>
				<NormalButton
					type="primary"
					text="비밀번호 찾기"
					onClick={onPwFindClick}
				></NormalButton>
			</PwFindButton>
		</>
	);
}

const PwFindTitle = styled.p`
	padding-left: 12.5%;
	padding-top: 32px;
	padding-bottom: 32px;
	background-color: var(--color-top-title);
	font-size: 30px;
	color: var(--color-normal-text-color);
	border-bottom: 1px solid var(--color-white-gray);
`;

const PwFindRoot = styled.div`
	max-width: 600px;
	width: ${(props) => (props.isMobile ? '75%' : '600px')};
	margin: auto;
	margin-top: 84px;
`;

const PwFind = () => {
	const isMobile = useIsMobile();
	return (
		<main>
			<PwFindTitle>비밀번호 찾기</PwFindTitle>
			<PwFindRoot isMobile={isMobile}>
				<PwFindInner></PwFindInner>
			</PwFindRoot>
		</main>
	);
};

export default PwFind;
