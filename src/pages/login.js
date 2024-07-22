import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import InputBox from '../components/inputbox';
import { useIsMobile } from '../hooks/media-query';
import { PersonFill, LockFill } from 'react-bootstrap-icons';
import CheckBox from '../components/checkbox';
import NormalButton from '../components/button-normal';
const StyledLoginTitle = styled.p`
	padding-left: 12.5%;
	padding-top: 32px;
	padding-bottom: 32px;
	background-color: var(--color-top-title);
	font-size: 30px;
	color: var(--color-normal-text-color);
	border-bottom: 1px solid var(--color-white-gray);
`;
const StyledLoginFormRoot = styled.div`
	border: 1px solid var(--color-white-gray);
	max-width: 488px;
	width: ${({ $isMobile }) => ($isMobile == false ? '488px' : '75%')};
	margin: auto;
	margin-top: 72px;
`;
const StyledLoginFormInner = styled.div`
	margin-left: 24px;
	margin-right: 24px;
	padding-bottom: 24px;
`;
const StyledLoginMainTitle = styled.p`
	color: var(--color-normal-text-color);
	font-size: 30px;
	text-align: center;
	margin-top: 24px;
`;
const StyledLoginDivider = styled.div`
	height: 1px;
	width: 100%;
	background-color: var(--color-white-gray);
	margin-top: 24px;
`;
const StyledLoginFormDiv = styled.div`
	display: flex;
	margin-top: 24px;
	& div {
		width: 32px;
		height: 32px;
		box-sizing: border-box;
		flex-shrink: 0;
		padding: 8px;
		border: 1px solid var(--color-input-border);
		border-right: 0;
	}
	& button {
		flex-grow: 1;
	}
`;
const StyledLoginAction = styled.div`
	margin-top: 24px;
	display: flex;
	justify-content: space-between;
`;
const StyledLoginSubtitle = styled.p`
	font-size: 13px;
	text-align: center;
	margin-top: 12px;
	& a {
		text-decoration: none;
		color: var(--color-primary);
	}
`;
const LoginFormInner = () => {
	return (
		<StyledLoginFormInner>
			<StyledLoginMainTitle>로그인</StyledLoginMainTitle>
			<StyledLoginDivider></StyledLoginDivider>
			<StyledLoginFormDiv>
				<div>
					<PersonFill size="16" />
				</div>
				<InputBox type="text" placeholder="아이디 / 이메일"></InputBox>
			</StyledLoginFormDiv>
			<StyledLoginFormDiv>
				<div>
					<LockFill size="16" />
				</div>
				<InputBox type="password" placeholder="비밀번호"></InputBox>
			</StyledLoginFormDiv>
			<StyledLoginAction>
				<CheckBox id="checkbox" text="로그인 상태 유지" />
				<NormalButton type="primary" text="로그인"></NormalButton>
			</StyledLoginAction>
			<StyledLoginDivider></StyledLoginDivider>
			<StyledLoginSubtitle>
				비밀번호를 잊었을 경우 <NavLink to={'/pw-find'}>여기</NavLink>를
				눌러주세요.
			</StyledLoginSubtitle>
			<StyledLoginSubtitle>
				회원가입은 <NavLink to={'/join'}>여기</NavLink>에서 할 수 있습니다.
			</StyledLoginSubtitle>
		</StyledLoginFormInner>
	);
};
const Login = () => {
	const isMobile = useIsMobile();
	return (
		<main>
			<StyledLoginTitle>로그인</StyledLoginTitle>
			<StyledLoginFormRoot $isMobile={isMobile}>
				<LoginFormInner></LoginFormInner>
			</StyledLoginFormRoot>
		</main>
	);
};

export default Login;
