import React from 'react';
import imgLogo from '../../img/logo.png';
import { useIsMobile } from '../../hook/media-query';
import styled from 'styled-components';

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