import React from 'react';
import styled from 'styled-components';

/**
 * 체크박스 컴포넌트를 나타냅니다.
 * @param {Props} props - input tag 에 들어갈 수 있는 prop 지정 가능함
 * @param {String} props.id - input tag 의 id
 * @param {String} props.text - 체크박스를 표시할 때 들어가는 text
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const StyledDiv = styled.div`
	display: flex;
	align-items: center;
	& label {
		margin-left: 8px;
	}
	& input {
		width: 16px;
		height: 16px;
	}
`;
const CheckBox = (props) => {
	return (
		<StyledDiv>
			<input type="checkbox" {...props} />
			<label for={props.id}>{props.text}</label>
		</StyledDiv>
	);
};

export default CheckBox;
