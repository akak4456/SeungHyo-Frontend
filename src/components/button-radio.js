import React from 'react';
import styled from 'styled-components';

/**
 * 라디오 버튼 컴포넌트를 나타냅니다.
 * @param {String} text - 라디오 버튼에 들어갈 text 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const StyledLabel = styled.label`
	font-size: 13px;
	& input,
	$ span {
		vertical-align: middle;
	}
	& input {
		vertical-align: middle;
		appearance: none;

		border: 1px solid var(--color-primary);
		border-radius: 50%;
		width: 24px;
		height: 24px;
		position: relative;
	}
	& span {
		margin-left: 12px;
	}
	& input:checked::before {
		content: '';
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-primary); /* 가운데 원의 색상 */
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
const RadioButton = ({ text, value, onChange }) => {
	return (
		<StyledLabel>
			<input type="radio" name="name" value={value} onChange={onChange} />
			<span>{text}</span>
		</StyledLabel>
	);
};

export default RadioButton;
