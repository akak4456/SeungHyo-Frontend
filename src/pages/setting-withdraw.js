import React from 'react';
import styled, { css } from 'styled-components';
import SettingTab from '../components/button-setting-tab';
import { useIsMobile } from '../hooks/media-query';
import NormalButton from '../components/button-normal';
import { logoutUser } from '../api/Auth';
import { withdraw } from '../api/My';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../store/Cookie';
import { DELETE_TOKEN } from '../store/Auth';
const SettingWithdrawRootMain = styled.main`
	width: 75%;
	margin: auto;
	display: flex;
	margin-top: 48px;
	flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
`;
const SettingWithdrawContentDiv = styled.div`
	flex-grow: 1;
	margin-left: ${({ $isMobile }) => ($isMobile ? '0' : '24px')};
	${({ $isMobile }) =>
		$isMobile &&
		css`
			margin-top: 24px;
		`}
`;
const SettingWithdrawMainTitle = styled.p`
	font-size: 21px;
	color: var(--color-normal-text-color);
`;
const SettingWithdrawDivider = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
	margin-top: 8px;
`;
const SettingWithdrawSubTitle = styled.p`
	width: 100%;
	text-align: center;
	color: black;
	font-size: 13px;
	margin-top: 16px;
`;
const SettingWithdrawButtonGroupDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: 16px;
	& button:first-child {
		margin-left: auto;
	}
	& button:last-child {
		margin-right: auto;
		margin-left: 16px;
	}
`;
const SettingWithdraw = () => {
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	const accessToken = useSelector((state) => state.authToken.accessToken);
	const dispatch = useDispatch();
	const onWithdrawClick = () => {
		withdraw((data) => {
			if (data) {
				logoutUser(accessToken, getCookieToken(), () => {
					alert('회원탈퇴 하였습니다');
					removeCookieToken();
					dispatch(DELETE_TOKEN());
					navigate('/');
				});
			}
		});
	};
	return (
		<SettingWithdrawRootMain $isMobile={isMobile}>
			<SettingTab isWithdrawActive={true}></SettingTab>
			<SettingWithdrawContentDiv $isMobile={isMobile}>
				<SettingWithdrawMainTitle>탈퇴하기</SettingWithdrawMainTitle>
				<SettingWithdrawDivider></SettingWithdrawDivider>
				<SettingWithdrawSubTitle>
					회원 탈퇴를 진행할 경우 되돌릴 수 없습니다.
				</SettingWithdrawSubTitle>
				<SettingWithdrawSubTitle>
					회원 탈퇴를 하면 더 이상 서비스를 이용할 수 없습니다. 그래도 회원
					탈퇴를 진행하시겠습니까?
				</SettingWithdrawSubTitle>
				<SettingWithdrawSubTitle>
					탈퇴 후 같은 아이디로의 재가입은 불가능합니다.
				</SettingWithdrawSubTitle>
				<SettingWithdrawButtonGroupDiv>
					<NormalButton
						type="danger"
						text="탈퇴"
						onClick={() => onWithdrawClick()}
					></NormalButton>
					<NormalButton type="primary" text="취소"></NormalButton>
				</SettingWithdrawButtonGroupDiv>
			</SettingWithdrawContentDiv>
		</SettingWithdrawRootMain>
	);
};

export default SettingWithdraw;
