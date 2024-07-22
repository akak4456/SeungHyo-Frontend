import React from 'react';
import styled, { css } from 'styled-components';
import SettingTab from '../components/button-setting-tab';
import { useIsMobile } from '../hooks/media-query';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
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
	return (
		<SettingPwChangeRootMain $isMobile={isMobile}>
			<SettingTab isPWChangeActive={true}></SettingTab>
			<SettingPwChangeContentDiv $isMobile={isMobile}>
				<SettingPwChangeMainTitle>비밀번호 변경</SettingPwChangeMainTitle>
				<SettingPwChangeDivider></SettingPwChangeDivider>
				<SettingPwChangeInputTitle>아이디</SettingPwChangeInputTitle>
				<InputBox type="text" disabled value="akak4456"></InputBox>
				<SettingPwChangeInputTitle>비밀번호</SettingPwChangeInputTitle>
				<InputBox type="password" placeholder="비밀번호"></InputBox>
				<SettingPwChangeInputTitle>새로운 비밀번호</SettingPwChangeInputTitle>
				<InputBox type="password" placeholder="새로운 비밀번호"></InputBox>
				<SettingPwChangeInputTitle>
					새로운 비밀번호 확인
				</SettingPwChangeInputTitle>
				<InputBox type="password" placeholder="새로운 비밀번호 확인"></InputBox>
				<SettingPwChangeButtonGroupDiv>
					<NormalButton type="primary" text="변경"></NormalButton>
				</SettingPwChangeButtonGroupDiv>
			</SettingPwChangeContentDiv>
		</SettingPwChangeRootMain>
	);
};

export default SettingPwChange;
