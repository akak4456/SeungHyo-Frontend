import React from 'react';
import Logo from '../components/logo';
import styled from 'styled-components';
import { useIsMobile } from '../hooks/media-query.js';
const StyledFooter = styled.footer`
	padding-left: 12.5%;
	padding-right: 12.5%;
	display: flex;
	align-items: ${(props) => (props.isMobile ? 'center' : 'flex-end')};
	height: 200px;
	padding-bottom: 32px;
	text-align: center;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	justify-content: flex-end;
`;
const StyledSpan = styled.span`
	color: var(--color-normal-text-color);
	margin-bottom: ${(props) => (props.isMobile ? '8px' : '0')};
`;
const Footer = (props) => {
	const isMobile = useIsMobile();
	return (
		<StyledFooter isMobile={isMobile}>
			<StyledSpan isMobile={isMobile}>
				Copyright © 2024 주식회사 승효. All rights reserved.
			</StyledSpan>
			<Logo marginLeft={isMobile ? '' : 'auto'} />
		</StyledFooter>
	);
};
export default Footer;
