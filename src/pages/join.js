import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { useIsMobile } from '../hooks/media-query';
import { sendEmailCheckCode, validEmailCheckCode, join } from '../api/Auth';
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
	flex-wrap: wrap;
	& div {
		flex: 1 1 0;
	}
	& button {
		flex: 0 0 auto;
		height: 32px;
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
	const [formValue, setFormValue] = useState({
		id: '',
		statusMsg: '',
		pw: '',
		pwcheck: '',
		email: '',
		emailCode: '',
	});
	const [warning, setWarning] = useState({
		idWarning: '',
		statusMsgWarning: '',
		passwordWarning: '',
		passwordCheckWarning: '',
		emailWarning: '',
		emailCheckWarning: '',
	});
	const navigate = useNavigate();
	const onJoinClick = () => {
		join(formValue, (data) => {
			let joinSuccess = true;
			let idWarning = '';
			let statusMsgWarning = '';
			let passwordWarning = '';
			let passwordCheckWarning = '';
			let emailWarning = '';
			let emailCheckWarning = '';
			if (data.emailDuplicate) {
				joinSuccess = false;
				emailWarning = '이메일이 중복됩니다.';
			}
			if (data.emailNotValidForm) {
				joinSuccess = false;
				emailWarning = '이메일이 올바른 형태가 아닙니다.';
			}
			if (data.emailNotValidate) {
				joinSuccess = false;
				emailCheckWarning = '이메일이 인증되지 않았습니다.';
			}
			if (data.idDuplicate) {
				joinSuccess = false;
				idWarning = '아이디가 중복됩니다.';
			}
			if (data.idNotValidForm) {
				joinSuccess = false;
				idWarning = '아이디가 올바른 형태가 아닙니다.';
			}
			if (data.pwAndPwCheckDifferent) {
				joinSuccess = false;
				passwordCheckWarning = '비밀번호와 비밀번호 확인이 다릅니다.';
			}
			if (data.pwNotValidForm) {
				joinSuccess = false;
				passwordWarning = '비밀번호가 올바른 형태가 아닙니다.';
			}
			if (data.statusNotValidForm) {
				joinSuccess = false;
				statusMsgWarning = '상태메시지가 올바른 형태가 아닙니다.';
			}
			setWarning((state) => ({
				idWarning: idWarning,
				statusMsgWarning: statusMsgWarning,
				passwordWarning: passwordWarning,
				passwordCheckWarning: passwordCheckWarning,
				emailWarning: emailWarning,
				emailCheckWarning: emailCheckWarning,
			}));
			if (joinSuccess) {
				alert('회원가입이 완료되었습니다.');
				navigate('/login');
			} else {
				alert('회원가입에 문제가 생겼습니다.');
			}
		});
	};
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
			<InputBox
				type="text"
				onChange={(value) => {
					setFormValue((state) => ({
						...state,
						id: value,
					}));
				}}
				warning={warning.idWarning}
			></InputBox>
			<JoinInputTitle>
				상태 메시지 (다른 사람에게 보이고 싶은 한마디)
			</JoinInputTitle>
			<InputBox
				type="text"
				onChange={(value) => {
					setFormValue((state) => ({
						...state,
						statusMsg: value,
					}));
				}}
				warning={warning.statusMsgWarning}
			></InputBox>
			<JoinInputTitle>비밀번호</JoinInputTitle>
			<InputBox
				type="password"
				onChange={(value) => {
					setFormValue((state) => ({
						...state,
						pw: value,
					}));
				}}
				warning={warning.passwordWarning}
			></InputBox>
			<JoinInputTitle>비밀번호 확인</JoinInputTitle>
			<InputBox
				type="password"
				onChange={(value) => {
					setFormValue((state) => ({
						...state,
						pwcheck: value,
					}));
				}}
				warning={warning.passwordCheckWarning}
			></InputBox>
			<JoinInputTitle>이메일</JoinInputTitle>
			<JoinEmailDiv>
				<InputBox
					type="text"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							email: value,
						}));
					}}
					warning={warning.emailWarning}
				></InputBox>
				<NormalButton
					type="primary"
					text="인증번호 전송"
					onClick={() => {
						sendEmailCheckCode(formValue.email, (data) => {
							if (data) {
								alert('인증코드를 보냈습니다.');
							} else {
								alert('이메일을 확인해주세요');
							}
						});
					}}
				></NormalButton>
			</JoinEmailDiv>
			<JoinInputTitle>이메일 확인</JoinInputTitle>
			<JoinEmailDiv>
				<InputBox
					type="text"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							emailCode: value,
						}));
					}}
					warning={warning.emailCheckWarning}
				></InputBox>
				<NormalButton
					type="primary"
					text="인증번호 확인"
					onClick={() => {
						validEmailCheckCode(
							formValue.email,
							formValue.emailCode,
							(data) => {
								alert(data);
							}
						);
					}}
				></NormalButton>
			</JoinEmailDiv>

			<JoinBtnDiv>
				<NormalButton
					type="primary"
					text="회원가입"
					onClick={(e) => onJoinClick()}
				></NormalButton>
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
