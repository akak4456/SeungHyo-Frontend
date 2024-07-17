import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../components/logo.js';
import HamburgerButton from '../components/button-hamburger.js';
import { useIsMobile } from '../hooks/media-query.js';

const StyledHeader = styled.header`
	padding-left: 12.5%;
	padding-right: 12.5%;
	border-bottom: 1px solid var(--color-white-gray);
	display: flex;
	position: relative;
	flex-direction: row;
	& a {
		text-decoration: none;
	}
	align-items: center;
`;

const StyledPCButtonsDiv = styled.div`
	margin-left: 32px;
	display: flex;
	align-items: flex-end;
	flex-direction: row;
	position: relative;
`;

const StyledTapDiv = styled.div`
	display: inline-block;
	position: relative;
	& a {
		display: inline-block;
		padding: 16px;
		padding-top: 32px;
		padding-bottom: 30px;
		border-bottom: 2px solid transparent;
		font-size: 16px;

		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
		text-decoration: none;
		color: var(--color-normal-text-color);
		font-weight: bold;
	}
	& a:active {
		border-bottom: 2px solid var(--color-primary);
		color: var(--color-normal-text-color);
	}
	& a:hover {
		border-bottom: 2px solid var(--color-primary);
		color: var(--color-normal-text-color);
	}
	& img {
		width: 14px;
		height: 14px;
	}
`;

const StyledMobileDropDownDiv = styled.div`
	position: absolute;
	top: 100%;
	width: 75%;
	background-color: white;
	margin-top: 1px;
	transition: all;
	transition-duration: 0.5s;
	opacity: ${(props) => (props.$isDropdownShown ? '1' : '0')};
	visibility: ${(props) => (props.$isDropdownShown ? 'visible' : 'collapse')};
	z-index: 999;
	& a {
		text-decoration: none;
		color: var(--color-normal-text-color);
	}

	& p {
		padding: 16px;
		color: var(--color-normal-text-color);
		border-bottom: 1px solid var(--color-white-gray);
		font-weight: bold;
	}
`;

const StyledRightSideDiv = styled.div`
	margin-left: auto;
	height: 100%;
	& > div {
		display: inline-block;
		height: 100%;
		display: flex;
		padding-top: ${(props) => (props.$isMobile ? '16px' : '0')};
		padding-bottom: ${(props) => (props.$isMobile ? '16px' : '0')};
		box-sizing: border-box;
		padding-left: 16px;
		padding-right: 16px;
		margin-right: -16px;
	}
	& img {
		border-radius: 16px;
		width: 32px;
		height: 32px;
		margin: auto;
		cursor: pointer;
	}
`;
const StyledMobileButtonsDiv = styled.div`
	margin-left: 32px;
`;
const StyledMyDiv = styled.div`
	position: absolute;
	z-index: 999;
	width: ${(props) => (props.$isMyShown ? '200px' : '0')};
	height: ${(props) => (props.$isMyShown ? '200px' : '0')};
	transition: 0.5s;
	top: 100%;
	right: 12.5%;
	float: right;
`;
const StyledMyContentDiv = styled.div`
	margin-top: 16px;
	width: 100%;
	height: 100%;
	border: 1px solid var(--color-white-gray);
	border-radius: 8px;
	background-color: white;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;
const StyledMyName = styled.p`
	text-align: center;
	margin-top: 16px;
	color: var(--color-normal-text-color);
	font-size: 16px;
	font-weight: bold;
`;
const StyledMyBottomDiv = styled.div`
	margin-top: auto;
	& a {
		display: inline-box;
		width: 50%;
		box-sizing: border-box;
		float: left;
		color: var(--color-normal-text-color);
		font-size: 16px;
		font-weight: bold;
		padding: 16px;
		text-align: center;
		white-space: nowrap; // 텍스트를 한 줄로 유지
		overflow: hidden; // 넘치는 텍스트를 숨김
	}
`;

const TapButton = ({ linkTo, element }) => {
	return (
		<StyledTapDiv>
			<NavLink to={linkTo ? linkTo : '#'}>{element}</NavLink>
		</StyledTapDiv>
	);
};

const Header = (props) => {
	const isMobile = useIsMobile();
	const [isDropdownShown, setDropdownShown] = useState(false);
	const [isMyShown, setMyShown] = useState(false);
	const location = useLocation();
	const myRef = useRef();
	useEffect(() => {
		setMyShown(false);
	}, [location]);

	useEffect(() => {
		const handleOutsideClose = (e) => {
			// useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
			if (isMyShown && !myRef.current.contains(e.target)) setMyShown(false);
		};
		document.addEventListener('click', handleOutsideClose);

		return () => document.removeEventListener('click', handleOutsideClose);
	}, [isMyShown]);
	const onShow = () => {
		setDropdownShown(true);
	};
	const onHide = () => {
		setDropdownShown(false);
	};
	const [isLogined, setIsLogined] = useState(true); // 임시값 TODO 나중에 변경할 것
	return (
		<StyledHeader>
			<NavLink to="/">
				<Logo />
			</NavLink>
			{!isMobile && (
				<StyledPCButtonsDiv>
					<TapButton element={'문제'} linkTo={'/problem-list'} />
					<TapButton element={'오답노트'} linkTo={'/reflection-note-list'} />
					<TapButton element={'게시판'} linkTo={'/board'} />
					<TapButton element={'검색'} linkTo={'/search'} />
				</StyledPCButtonsDiv>
			)}
			{isMobile && (
				<StyledMobileButtonsDiv>
					<HamburgerButton onClick={isDropdownShown ? onHide : onShow} />
				</StyledMobileButtonsDiv>
			)}
			{isMobile && (
				<StyledMobileDropDownDiv $isDropdownShown={isDropdownShown}>
					<NavLink to="/problem-list">
						<p onClick={onHide}>문제</p>
					</NavLink>
					<NavLink to="/reflection-note-list">
						<p onClick={onHide}>오답노트</p>
					</NavLink>
					<NavLink to="/board">
						<p onClick={onHide}>게시판</p>
					</NavLink>
					<NavLink to="/search">
						<p onClick={onHide}>검색</p>
					</NavLink>
				</StyledMobileDropDownDiv>
			)}
			<StyledRightSideDiv $isMobile={isMobile}>
				{!isLogined && <NavLink to="/login">로그인</NavLink>}
				{isLogined && (
					<div ref={myRef} onClick={() => setMyShown(!isMyShown)}>
						<img src="https://static.solved.ac/misc/64x64/default_profile.png"></img>
					</div>
				)}
			</StyledRightSideDiv>
			<StyledMyDiv
				$isMyShown={isMyShown}
				onClick={() => setMyShown(!isMyShown)}
			>
				<StyledMyContentDiv>
					<NavLink to="/user">
						<StyledMyName>akak44567</StyledMyName>
					</NavLink>
					<StyledMyBottomDiv>
						<NavLink to="/setting/info-edit">설정</NavLink>
						<NavLink to="#">로그아웃</NavLink>
					</StyledMyBottomDiv>
				</StyledMyContentDiv>
			</StyledMyDiv>
		</StyledHeader>
	);
};

export default Header;
