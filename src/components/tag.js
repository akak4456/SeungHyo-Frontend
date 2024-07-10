import React from 'react';
import styled from 'styled-components';

/**
 * 태그를 나타냄
 * @param {string} props.backgroundColor - 태그의 background 지정
 * @param {string} props.marginLeft - 태그의 marginLeft 지정
 * @param {string} props.text - 태그에 들어갈 text 지정
 * @param {function} props.onClick - 태그 클릭시 할 행동 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const Tag = (props) => {
	const StyledDiv = styled.div`
		box-sizing: border-box;
		display: inline-block;
		padding: 8px;
		color: white;
		background-color: ${props.backgroundColor};
		margin-left: ${props.marginLeft};
	`;
	return <StyledDiv onClick={props.onClick}>{props.text}</StyledDiv>;
};

export default Tag;
