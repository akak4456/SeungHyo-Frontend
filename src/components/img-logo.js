import React from 'react';
import imgLogo from '../assets/logo.png';
import { useIsMobile } from '../hooks/media-query';
import styled from 'styled-components';

/**
 * 홈페이지에 쓰이는 로고 컴포넌트를 나타냅니다.
 * 주로 헤더와 푸터에 사용됨
 * @param {String} marginLeft - margin-left 에 부여할 스타일 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const LogoImg = styled.img`
	width: ${(props) => (props.isMobile ? '100px' : '200px')};
	margin-top: 16px;
	margin-bottom: 16px;
	margin-left: ${(props) => props.marginLeft};
`;
const Logo = ({ marginLeft }) => {
	const isMobile = useIsMobile();
	return (
		<LogoImg
			isMobile={isMobile}
			marginLeft={marginLeft}
			src={imgLogo}
		></LogoImg>
	);
};

export default Logo;
