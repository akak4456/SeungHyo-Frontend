import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import InputBox from '../components/inputbox';
import { useIsMobile } from '../hooks/media-query';
import { PersonFill, LockFill } from 'react-bootstrap-icons';
import CheckBox from '../components/checkbox';
import NormalButton from '../components/button-normal';
import { loginUser } from '../api/Auth';
import { setRefreshToken } from '../store/Cookie';
import { SET_TOKEN } from '../store/Auth';
import { useDispatch } from 'react-redux';
import { setIsKeepLoginCookie } from '../store/Cookie';
import { SET_MY_ID } from '../store/MyInfo';
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
	& div:first-child {
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
	const [formValue, setFormValue] = useState({
		id: '',
		pw: '',
		isKeepLogin: false,
	});
	const [warning, setWarning] = useState({
		idWarning: '',
		pwWarning: '',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onCheckboxChange = (e) => {
		setFormValue((state) => ({
			...state,
			isKeepLogin: !state.isKeepLogin,
		}));
	};
	return (
		<StyledLoginFormInner>
			<StyledLoginMainTitle>로그인</StyledLoginMainTitle>
			<StyledLoginDivider></StyledLoginDivider>
			<StyledLoginFormDiv>
				<div>
					<PersonFill size="16" />
				</div>
				<InputBox
					type="text"
					placeholder="아이디 / 이메일"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							id: value,
						}));
					}}
					warning={warning.idWarning}
				></InputBox>
			</StyledLoginFormDiv>
			<StyledLoginFormDiv>
				<div>
					<LockFill size="16" />
				</div>
				<InputBox
					type="password"
					placeholder="비밀번호"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							pw: value,
						}));
					}}
					warning={warning.pwWarning}
				></InputBox>
			</StyledLoginFormDiv>
			<StyledLoginAction>
				<CheckBox
					id="checkbox"
					text="로그인 상태 유지"
					onChange={onCheckboxChange}
				/>
				<NormalButton
					type="primary"
					text="로그인"
					onClick={() =>
						loginUser(
							formValue.id,
							formValue.pw,
							(response) => {
								dispatch(SET_MY_ID(formValue.id));
								setIsKeepLoginCookie(formValue.isKeepLogin);
								setRefreshToken(response.data.data.refreshToken);
								dispatch(SET_TOKEN(response.data.data.accessToken));
								navigate('/');
							},
							(exception) => {
								const errors = exception?.response?.data?.data?.errors;
								let idWarning = '';
								if (errors.find((error) => error.field === 'memberId')) {
									idWarning = '아이디 폼이 유효하지 않습니다';
								} else if (exception?.response?.data?.status == 'FORBIDDEN') {
									idWarning = '아이디 또는 비밀번호가 일치하지 않습니다';
								}
								setWarning((state) => ({ ...state, idWarning: idWarning }));
								let pwWarning = '';
								if (errors.find((error) => error.field === 'memberPw')) {
									pwWarning = '비밀번호 폼이 유효하지 않습니다';
								}
								setWarning((state) => ({ ...state, pwWarning: pwWarning }));
							}
						)
					}
				></NormalButton>
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
