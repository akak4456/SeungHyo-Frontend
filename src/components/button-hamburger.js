import React from 'react';
import styled from 'styled-components';
import { List } from 'react-bootstrap-icons';

/**
 * 햄버거 버튼을 나타냄
 * @param {function} onClick - on click 에 동작할 것 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const StyledButton = styled.button`
	background-color: var(--color-primary);
	padding: 4px;
`;
  const HamburgerButton = ({ onClick }) => {
	   return (
		<StyledButton onClick={onClick}>
			<List color="white" size="12" />
		</StyledButton>
	);
};

export default HamburgerButton;
