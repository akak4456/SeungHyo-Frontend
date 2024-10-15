import React, { useState } from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { useIsMobile } from '../hooks/media-query';
import { resetPassword } from '../api/Auth';
import { useNavigate } from 'react-router-dom';
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
	const [form, setForm] = useState();
	const navigate = useNavigate();
	const onPwFindClick = () => {
		resetPassword(
			form,
			(response) => {
				alert('비밀번호를 초기화하였습니다.');
				navigate('/login');
			},
			(error) => {
				console.log(error);
				alert('비밀번호 초기화 과정 중에 오류가 발생했습니다.');
			}
		);
	};
	return (
		<>
			<PwFindInputTitle>아이디</PwFindInputTitle>
			<InputBox
				type="text"
				onChange={(value) => {
					setForm((state) => ({
						...state,
						id: value,
					}));
				}}
			></InputBox>
			<PwFindInputTitle>이메일</PwFindInputTitle>
			<InputBox
				type="text"
				onChange={(value) => {
					setForm((state) => ({
						...state,
						email: value,
					}));
				}}
			></InputBox>
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
	width: ${({ $isMobile }) => ($isMobile ? '75%' : '600px')};
	margin: auto;
	margin-top: 84px;
`;

const PwFind = () => {
	const isMobile = useIsMobile();
	return (
		<main>
			<PwFindTitle>비밀번호 찾기</PwFindTitle>
			<PwFindRoot $isMobile={isMobile}>
				<PwFindInner></PwFindInner>
			</PwFindRoot>
		</main>
	);
};

export default PwFind;
