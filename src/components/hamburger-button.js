import React from 'react';
import styled from 'styled-components';
import { List } from 'react-bootstrap-icons';

/**
 * 햄버거 버튼을 나타냄
 * @param {function} props.onClick - on click 에 동작할 것 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const HamburgerButton = (props) => {
	const StyledButton = styled.button`
		background-color: var(--color-primary);
		padding: 4px;
	`;
	return (
		<StyledButton onClick={props.onClick}>
			<List color="white" size="12" />
		</StyledButton>
	);
};

export default HamburgerButton;
