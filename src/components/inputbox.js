import React from 'react';
import styled from 'styled-components';
const StyledInputDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const StyledInput = styled.input`
	border: ${({ $isWarning }) =>
		$isWarning
			? '1px solid var(--color-danger)'
			: '1px solid var(--color-input-border)'};
	height: 32px;
	padding-left: 8px;
	padding-right: 8px;
	box-sizing: border-box;
	width: 100%;

	&:disabled {
		background-color: var(--color-white-gray);
	}
`;
const StyledWarning = styled.span`
	color: var(--color-danger);
	font-size: 11px;
	margin-top: 8px;
`;
const InputBox = (props) => {
	return (
		<StyledInputDiv>
			<StyledInput
				$isWarning={props.warning}
				{...props}
				onChange={(e) => {
					props.onChange(e.target.value);
				}}
			></StyledInput>
			<StyledWarning>{props.warning}</StyledWarning>
		</StyledInputDiv>
	);
};

export default InputBox;
