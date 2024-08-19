import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SettingTab from '../components/button-setting-tab';
import { useIsMobile } from '../hooks/media-query';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { getInfoEdit, patchInfoEdit } from '../api/My';
const SettingInfoEditRootMain = styled.main`
	width: 75%;
	margin: auto;
	display: flex;
	margin-top: 48px;
	flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
`;
const SettingInfoEditContentDiv = styled.div`
	flex-grow: 1;
	margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '24px')};

	${({ $isMobile }) =>
		$isMobile &&
		css`
			margin-top: 24px;
		`}
`;
const SettingInfoEditMainTitle = styled.p`
	font-size: 21px;
	color: var(--color-normal-text-color);
`;
const SettingInfoEditDivider = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
	margin-top: 8px;
`;
const SettingInfoInputTitle = styled.p`
	font-weight: bold;
	color: var(--color-gray);
	font-size: 13px;
	margin-top: 16px;
	margin-bottom: 6px;
`;
const SettingInfoEditButtonGroupDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: 16px;
	& button {
		margin: auto;
	}
`;
const SettingInfoEdit = () => {
	const isMobile = useIsMobile();
	const [infoValue, setInfoValue] = useState({
		id: '',
		pw: '',
		statusMessage: '',
		email: '',
	});
	const [warning, setWarning] = useState({
		statusMsgWarning: '',
		passwordWarning: '',
	});
	const onInfoEditClick = () => {
		patchInfoEdit(infoValue, (data) => {
			console.log(data);
			let passwordWarning = '';
			let statusMsgWarning = '';
			let available = true;
			if (!data.pwMatch || !data.memberPwValidForm) {
				available = false;
				passwordWarning = '비밀번호를 확인해주세요';
			}
			if (!data.statusMessageValidForm) {
				available = false;
				statusMsgWarning = '상태 메시지는 빈칸이면 안됩니다.';
			}
			setWarning((state) => ({
				statusMsgWarning: statusMsgWarning,
				passwordWarning: passwordWarning,
			}));
			if (available) {
				alert('수정하였습니다!');
				setInfoValue((state) => ({
					...state,
					pw: '',
				}));
			}
		});
	};
	useEffect(() => {
		getInfoEdit((data) => {
			setInfoValue((state) => ({
				id: data.memberId,
				email: data.email,
				statusMessage: data.statusMessage,
			}));
		});
	}, []);
	return (
		<SettingInfoEditRootMain $isMobile={isMobile}>
			<SettingTab isInfoEditActive={true}></SettingTab>
			<SettingInfoEditContentDiv $isMobile={isMobile}>
				<SettingInfoEditMainTitle>정보 수정</SettingInfoEditMainTitle>
				<SettingInfoEditDivider></SettingInfoEditDivider>
				<SettingInfoInputTitle>아이디</SettingInfoInputTitle>
				<InputBox type="text" disabled value={infoValue.id}></InputBox>
				<SettingInfoInputTitle>상태 메시지</SettingInfoInputTitle>
				<InputBox
					type="text"
					onChange={(value) => {
						setInfoValue((state) => ({
							...state,
							statusMessage: value,
						}));
					}}
					value={infoValue.statusMessage}
					warning={warning.statusMsgWarning}
				></InputBox>
				<SettingInfoInputTitle>비밀번호</SettingInfoInputTitle>
				<InputBox
					type="password"
					value={infoValue.pw}
					onChange={(value) => {
						setInfoValue((state) => ({
							...state,
							pw: value,
						}));
					}}
					placeholder="비밀번호"
					warning={warning.passwordWarning}
				></InputBox>
				<SettingInfoInputTitle>이메일</SettingInfoInputTitle>
				<InputBox type="text" disabled value={infoValue.email}></InputBox>
				<SettingInfoEditButtonGroupDiv>
					<NormalButton
						type="primary"
						text="수정"
						onClick={() => {
							onInfoEditClick();
						}}
					></NormalButton>
				</SettingInfoEditButtonGroupDiv>
			</SettingInfoEditContentDiv>
		</SettingInfoEditRootMain>
	);
};

export default SettingInfoEdit;
