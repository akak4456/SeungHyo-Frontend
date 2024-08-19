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
		changePw(formValue, (data) => {
			let available = true;
			let warningCurrentPw = '';
			let warningNewPw = '';
			let warningNewPwCheck = '';
			if (!data.currentPwAndNewPwNotMatch) {
				available = false;
				warningCurrentPw = '비밀번호와 새로운 비밀번호가 일치합니다.';
			}
			if (!data.currentPwMatch) {
				available = false;
				warningCurrentPw = '기존에 쓰던 비밀번호를 입력해주세요.';
			}
			if (!data.newPwMatch) {
				available = false;
				warningNewPwCheck =
					'새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다.';
			}
			if (!data.newPwValidForm) {
				available = false;
				warningNewPw = '새로운 비밀번호 형식을 확인해주세요.';
			}
			setWarning((state) => ({
				warningCurrentPw: warningCurrentPw,
				warningNewPw: warningNewPw,
				warningNewPwCheck: warningNewPwCheck,
			}));
			if (available) {
				logoutUser(
					accessToken,
					getCookieToken(),
					(data) => {
						alert('비밀번호를 변경했습니다. 다시 로그인해주세요');
						removeCookieToken();
						dispatch(DELETE_TOKEN());
						navigate('/login');
					},
					() => {
						removeCookieToken();
						dispatch(DELETE_TOKEN());
						navigate('/');
					}
				);
			}
		});
	};
	useEffect(() => {
		getInfoEdit((data) => {
			setFormValue((state) => ({
				...state,
				id: data.memberId,
			}));
		});
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
