import React, { useState, useEffect, useDebugValue } from 'react';
import styled, { css } from 'styled-components';
import SettingTab from '../components/button-setting-tab';
import { useIsMobile } from '../hooks/media-query';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { getInfoEdit, changePw } from '../api/My';
import { logoutUser } from '../api/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../store/Cookie';
import { useNavigate } from 'react-router-dom';
import { DELETE_TOKEN } from '../store/Auth';
const SettingPwChangeRootMain = styled.main`
	width: 75%;
	margin: auto;
	display: flex;
	margin-top: 48px;
	flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
`;
const SettingPwChangeContentDiv = styled.div`
	flex-grow: 1;
	margin-left: ${({ $isMobile }) => ($isMobile ? '0' : '24px')};
	${({ $isMobile }) =>
		$isMobile &&
		css`
			margin-top: 24px;
		`}
`;
const SettingPwChangeMainTitle = styled.p`
	font-size: 21px;
	color: var(--color-normal-text-color);
`;
const SettingPwChangeDivider = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
	margin-top: 8px;
`;
const SettingPwChangeInputTitle = styled.p`
	font-weight: bold;
	color: var(--color-gray);
	font-size: 13px;
	margin-top: 16px;
	margin-bottom: 6px;
`;
const SettingPwChangeButtonGroupDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: 16px;
	& button {
		margin: auto;
	}
`;
const SettingPwChange = () => {
	const isMobile = useIsMobile();
	const [formValue, setFormValue] = useState({
		id: '',
		currentPw: '',
		newPw: '',
		newPwCheck: '',
	});
	const accessToken = useSelector((state) => state.authToken.accessToken);
	const navigate = useNavigate();
	const [warning, setWarning] = useState({
		warningCurrentPw: '',
		warningNewPw: '',
		warningNewPwCheck: '',
	});
	const dispatch = useDispatch();
	const onChangePwClick = () => {
		changePw(
			formValue,
			(response) => {
				logoutUser(
					accessToken,
					getCookieToken(),
					(response) => {
						alert('비밀번호를 변경했습니다. 다시 로그인해주세요');
						removeCookieToken();
						dispatch(DELETE_TOKEN());
						navigate('/login');
					},
					(exception) => {
						removeCookieToken();
						dispatch(DELETE_TOKEN());
						navigate('/');
					}
				);
			},
			(exception) => {
				const errors = exception?.response?.data?.data?.errors;
				const errorCode = exception?.response?.data?.data?.code;
				let warningCurrentPw = '';
				let warningNewPw = '';
				let warningNewPwCheck = '';
				console.log(errorCode);
				if (errorCode === 'M007') {
					warningCurrentPw = '비밀번호와 새로운 비밀번호가 일치합니다.';
				} else if (errorCode === 'M001') {
					warningCurrentPw = '기존에 쓰던 비밀번호를 입력해주세요.';
				} else if (errors.find((error) => error.field === 'currentPw')) {
					warningCurrentPw = '비밀번호 형식을 확인해주세요.';
				}
				if (errorCode === 'M008') {
					warningNewPwCheck =
						'새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다.';
				} else if (errors.find((error) => error.field === 'newPw')) {
					warningNewPwCheck = '새로운 비밀번호 확인 형식을 확인해주세요.';
				}
				if (errors.find((error) => error.field === 'newPw')) {
					warningNewPw = '새로운 비밀번호 형식을 확인해주세요.';
				}
				setWarning((state) => ({
					warningCurrentPw: warningCurrentPw,
					warningNewPw: warningNewPw,
					warningNewPwCheck: warningNewPwCheck,
				}));
			}
		);
	};
	useEffect(() => {
		getInfoEdit(
			(response) => {
				const data = response.data.data;
				setFormValue((state) => ({
					...state,
					id: data.memberId,
				}));
			},
			(exception) => {}
		);
	}, []);
	return (
		<SettingPwChangeRootMain $isMobile={isMobile}>
			<SettingTab isPWChangeActive={true}></SettingTab>
			<SettingPwChangeContentDiv $isMobile={isMobile}>
				<SettingPwChangeMainTitle>비밀번호 변경</SettingPwChangeMainTitle>
				<SettingPwChangeDivider></SettingPwChangeDivider>
				<SettingPwChangeInputTitle>아이디</SettingPwChangeInputTitle>
				<InputBox type="text" disabled value={formValue.id}></InputBox>
				<SettingPwChangeInputTitle>비밀번호</SettingPwChangeInputTitle>
				<InputBox
					type="password"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							currentPw: value,
						}));
					}}
					value={formValue.currentPw}
					warning={warning.warningCurrentPw}
					placeholder="비밀번호"
				></InputBox>
				<SettingPwChangeInputTitle>새로운 비밀번호</SettingPwChangeInputTitle>
				<InputBox
					type="password"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							newPw: value,
						}));
					}}
					value={formValue.newPw}
					warning={warning.warningNewPw}
					placeholder="새로운 비밀번호"
				></InputBox>
				<SettingPwChangeInputTitle>
					새로운 비밀번호 확인
				</SettingPwChangeInputTitle>
				<InputBox
					type="password"
					onChange={(value) => {
						setFormValue((state) => ({
							...state,
							newPwCheck: value,
						}));
					}}
					value={formValue.newPwCheck}
					warning={warning.warningNewPwCheck}
					placeholder="새로운 비밀번호 확인"
				></InputBox>
				<SettingPwChangeButtonGroupDiv>
					<NormalButton
						type="primary"
						text="변경"
						onClick={() => onChangePwClick()}
					></NormalButton>
				</SettingPwChangeButtonGroupDiv>
			</SettingPwChangeContentDiv>
		</SettingPwChangeRootMain>
	);
};

export default SettingPwChange;
