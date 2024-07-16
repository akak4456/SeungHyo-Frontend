import React from 'react';
import Logo from '../components/logo';
import styled from 'styled-components';
const StyledFooter = styled.footer`
	padding-left: 12.5%;
	padding-right: 12.5%;
	display: flex;
	align-items: flex-end;
	height: 200px;
	padding-bottom: 32px;
`;
const StyledSpan = styled.span`
	color: var(--color-normal-text-color);
`;
const Footer = (props) => {
	return (
		<StyledFooter>
			<StyledSpan>
				Copyright © 2024 주식회사 승효. All rights reserved.
			</StyledSpan>
			<Logo marginLeft={'auto'} />
		</StyledFooter>
	);
};
export default Footer;
