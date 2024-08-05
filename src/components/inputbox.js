import React from 'react';
import styled from 'styled-components';
const StyledInput = styled.input`
	border: 1px solid var(--color-input-border);
	height: 32px;
	padding-left: 8px;
	padding-right: 8px;
	box-sizing: border-box;
	width: 100%;

	&:disabled {
		background-color: var(--color-white-gray);
	}
`;
const InputBox = (props) => {
	return (
		<StyledInput
			{...props}
			onChange={(e) => {
				props.onChange(e.target.value);
			}}
		></StyledInput>
	);
};

export default InputBox;
