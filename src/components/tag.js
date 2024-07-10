import React from 'react';
import styled from 'styled-components';

/**
 * 태그를 나타냄
 * @param {string} backgroundColor - 태그의 background 지정
 * @param {string} marginLeft - 태그의 marginLeft 지정
 * @param {string} text - 태그에 들어갈 text 지정
 * @param {function} onClick - 태그 클릭시 할 행동 지정
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const Tag = ({ backgroundColor, marginLeft, text, onClick }) => {
	const StyledDiv = styled.div`
		box-sizing: border-box;
		display: inline-block;
		padding: 8px;
		color: white;
		background-color: ${backgroundColor};
		margin-left: ${marginLeft};
	`;
	return <StyledDiv onClick={onClick}>{text}</StyledDiv>;
};

export default Tag;
