import React from 'react';
import imgLogo from '../img/logo.png';
import { useIsMobile } from '../hook/media-query';
import styled from 'styled-components';

/**
 * @typedef {object} Props
 * @property {string} marginLeft - margin-left 에 부여할 스타일 지정
 */

/**
 * 홈페이지에 쓰이는 로고 컴포넌트를 나타냅니다.
 * 주로 헤더와 푸터에 사용됩니다.
 * @param {Props} props - 컴포넌트에 전달되는 props 객체
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const Logo = (props) => {
    const isMobile = useIsMobile();
    const LogoImg = styled.img`
        width: ${isMobile ? '100px' : '200px'};
        margin-top: 16px;
        margin-bottom: 16px;
        margin-left: ${props.marginLeft}
    `;
    return <LogoImg src={imgLogo}></LogoImg>
}

export default Logo;