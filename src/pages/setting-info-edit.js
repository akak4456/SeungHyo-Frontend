import React from 'react';
import styled, { css } from 'styled-components';
import SettingTab from '../components/button-setting-tab';
import { useIsMobile } from '../hooks/media-query';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
const SettingInfoEditRootMain = styled.main`
	width: 75%;
	margin: auto;
	display: flex;
	margin-top: 48px;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
`;
const SettingInfoEditContentDiv = styled.div`
	flex-grow: 1;
	margin-left: ${(props) => (props.isMobile ? '0px' : '24px')};

	${(props) =>
		props.isMobile &&
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
	return (
		<SettingInfoEditRootMain isMobile={isMobile}>
			<SettingTab isInfoEditActive={true}></SettingTab>
			<SettingInfoEditContentDiv isMobile={isMobile}>
				<SettingInfoEditMainTitle>정보 수정</SettingInfoEditMainTitle>
				<SettingInfoEditDivider></SettingInfoEditDivider>
				<SettingInfoInputTitle>아이디</SettingInfoInputTitle>
				<InputBox type="text" disabled value="akak4456"></InputBox>
				<SettingInfoInputTitle>상태 메시지</SettingInfoInputTitle>
				<InputBox type="text" value="컴공 17 조승효"></InputBox>
				<SettingInfoInputTitle>비밀번호</SettingInfoInputTitle>
				<InputBox type="password" placeholder="비밀번호"></InputBox>
				<SettingInfoInputTitle>이메일</SettingInfoInputTitle>
				<InputBox type="text" disabled value="akak4456@naver.com"></InputBox>
				<SettingInfoEditButtonGroupDiv>
					<NormalButton type="primary" text="수정"></NormalButton>
				</SettingInfoEditButtonGroupDiv>
			</SettingInfoEditContentDiv>
		</SettingInfoEditRootMain>
	);
};

export default SettingInfoEdit;
