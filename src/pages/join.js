import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { useIsMobile } from '../hooks/media-query';
const JoinFormInnerDiv = styled.div`
	margin-left: 24px;
	margin-right: 24px;
`;
const JoinMainTitle = styled.p`
	color: var(--color-normal-text-color);
	font-size: 30px;
	text-align: center;
	margin-top: 24px;
`;
const JoinSubTitle = styled.p`
	font-size: 13px;
	text-align: center;
	margin-top: 12px;
	&:first-child {
		margin-top: 24px;
	}
	& a {
		text-decoration: none;
		color: var(--color-primary);
	}
`;
const JoinDivider = styled.div`
	height: 1px;
	width: 100%;
	background-color: var(--color-white-gray);
	margin-top: 24px;
`;
const JoinInputTitle = styled.p`
	font-weight: bold;
	color: var(--color-gray);
	font-size: 13px;
	margin-top: 12px;
	margin-bottom: 6px;
	&:first-child {
		margin-top: 24px;
	}
`;
const JoinEmailDiv = styled.div`
	display: flex;
	& input {
		flex: 1;
	}
	& button {
		flex: 0 0 auto;
	}
`;
const JoinBtnDiv = styled.div`
	margin-top: 24px;
	margin-bottom: 24px;
	display: flex;
	& button {
		margin-left: auto;
	}
`;
const JoinFormInner = () => {
	return (
		<JoinFormInnerDiv>
			<JoinMainTitle>회원가입</JoinMainTitle>
			<JoinSubTitle>
				계정이 이미 있는 경우 <NavLink to={'/login'}>로그인</NavLink>을
				해주세요.
			</JoinSubTitle>
			<JoinSubTitle>
				가입을 하면 승효 온라인 저지의{' '}
				<NavLink to={'/agree'}>
					이용약관, 개인정보취급방침 및 개인정보 3자제공
				</NavLink>
				에 동의하게 됩니다.
			</JoinSubTitle>
			<JoinSubTitle>가입 후 아이디는 변경할 수 없습니다.</JoinSubTitle>
			<JoinDivider></JoinDivider>
			<JoinInputTitle>아이디</JoinInputTitle>
			<InputBox type="text"></InputBox>
			<JoinInputTitle>
				상태 메시지 (다른 사람에게 보이고 싶은 한마디)
			</JoinInputTitle>
			<InputBox type="text"></InputBox>
			<JoinInputTitle>비밀번호</JoinInputTitle>
			<InputBox type="password"></InputBox>
			<JoinInputTitle>비밀번호 확인</JoinInputTitle>
			<InputBox type="password"></InputBox>
			<JoinInputTitle>이메일</JoinInputTitle>
			<JoinEmailDiv>
				<InputBox type="text"></InputBox>
				<NormalButton type="primary" text="인증번호 전송"></NormalButton>
			</JoinEmailDiv>
			<JoinInputTitle>이메일 확인</JoinInputTitle>
			<JoinEmailDiv>
				<InputBox type="text"></InputBox>
				<NormalButton type="primary" text="인증번호 확인"></NormalButton>
			</JoinEmailDiv>
			<JoinBtnDiv>
				<NormalButton type="primary" text="회원가입"></NormalButton>
			</JoinBtnDiv>
		</JoinFormInnerDiv>
	);
};
const JoinTitle = styled.p`
	padding-left: 12.5%;
	padding-top: 32px;
	padding-bottom: 32px;
	background-color: var(--color-top-title);
	font-size: 30px;
	color: var(--color-normal-text-color);
	border-bottom: 1px solid var(--color-white-gray);
`;
const JoinFormRootDiv = styled.div`
	border: 1px solid var(--color-white-gray);
	margin: auto;
	margin-top: 72px;
	width: ${(props) => (props.isMobile ? '75%' : '648px')};
	max-width: 648px;
`;
const Join = () => {
	const isMobile = useIsMobile();
	return (
		<main>
			<JoinTitle>회원가입</JoinTitle>
			<JoinFormRootDiv isMobile={isMobile}>
				<JoinFormInner></JoinFormInner>
			</JoinFormRootDiv>
		</main>
	);
};
export default Join;
