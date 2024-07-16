import React from 'react';
import styled from 'styled-components';

/**
 * 홈페이지에 쓰이는 로고 컴포넌트를 나타냅니다.
 * 주로 헤더와 푸터에 사용됨
 * @param {String} marginLeft - margin-left 에 부여할 스타일 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const LogoDiv = styled.div`
	margin-left: ${(props) => props.marginLeft};
	box-sizing: border-box;
	line-height: 1;
`;
const LogoTag = styled.span`
	background-color: var(--color-correct);
	text-decoration: none;
	color: white;
	font-weight: bold;
	padding: 8px;
	border-radius: 4px;
	font-size: 15px;
	display: inline-block;
`;
const LogoContent = styled.span`
	font-weight: bold;
	font-size: 15px;
	color: var(--color-normal-text-color);
	margin-left: 8px;
	font-family: Amarillo;
	display: inline-block;
	box-sizing: border-box;
`;
const Logo = ({ marginLeft }) => {
	return (
		<LogoDiv marginLeft={marginLeft}>
			<LogoTag>SH</LogoTag>
			<LogoContent>SeungHyo</LogoContent>
		</LogoDiv>
	);
};

export default Logo;
