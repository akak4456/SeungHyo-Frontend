import React from 'react';
import styled, { css } from 'styled-components';
import { useIsMobile } from '../hooks/media-query';
import { useNavigate } from 'react-router-dom';
const SettingTabBlockPara = styled.p`
	width: 100%;
	border: 1px solid var(--color-white-gray);
	color: var(--color-normal-text-color);
	background-color: white;
	font-size: 16px;
	padding-top: 16px;
	padding-bottom: 16px;
	padding-left: 8px;
	border-bottom: 0;
	&:hover {
		color: var(--color-primary);
	}
	&:last-child {
		border-bottom: 1px solid var(--color-white-gray);
	}
	${({ $isActive }) =>
		$isActive &&
		css`
			color: white;
			background-color: var(--color-setting-tab-background);
			&:hover {
				color: white;
			}
		`}
`;
const SettingTabBlock = (props) => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate(props.link);
	};
	return (
		<SettingTabBlockPara $isActive={props.isActive} onClick={onClick}>
			{props.text}
		</SettingTabBlockPara>
	);
};
const SettingInner = (props) => {
	return (
		<>
			<SettingTabBlock
				text={'정보 수정'}
				isActive={props.isInfoEditActive}
				link={'/setting/info-edit'}
			></SettingTabBlock>
			<SettingTabBlock
				text={'비밀번호 변경'}
				isActive={props.isPWChangeActive}
				link={'/setting/pw-change'}
			></SettingTabBlock>
			<SettingTabBlock
				text={'탈퇴하기'}
				isActive={props.isWithdrawActive}
				link={'/setting/withdraw'}
			></SettingTabBlock>
		</>
	);
};
const SettingTabRootDiv = styled.div`
	width: ${({ $isMobile }) => ($isMobile ? '100%' : '300px')};
	cursor: pointer;
`;
const SettingTab = (props) => {
	const isMobile = useIsMobile();
	return (
		<SettingTabRootDiv $isMobile={isMobile}>
			<SettingInner {...props}></SettingInner>
		</SettingTabRootDiv>
	);
};
export default SettingTab;
