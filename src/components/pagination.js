import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// 콘솔 오류를 예외로 던지도록 설정
if (process.env.NODE_ENV !== 'production') {
	const originalConsoleError = console.error;
	console.error = function (message, ...args) {
		if (/(Failed prop type)/.test(message)) {
			throw new Error(message);
		}
		originalConsoleError.apply(console, [message, ...args]);
	};
}

const StyledDiv = styled.div`
	& a {
		text-decoration: none;
		color: var(--color-primary);
		padding-left: 8px;
	}
	& a:first-child {
		padding-left: 0;
	}
`;

/**
 * 페이징 네비게이터를 나타냄
 * @param {number} minVal - 페이징의 처음 숫자를 나타냄, 필수값
 * @param {number} maxVal - 페이징의 마지막 숫자를 나타냄, 필수값
 * @param {bool} isPrevIncluded - 이전 버튼이 들어갈 것인지 여부, 선택값
 * @param {bool} isNextIncluded - 다음 버튼이 들어갈 것인지 여부, 선택값
 * @param {function(number)} goToLink - 페이지 번호로 이동
 * @param {String} prevLink - 이전 버튼이 눌렸을 때 이동해야 하는 링크
 * @param {String} nextLink - 다음 버튼이 눌렸을 때 이동해야 하는 링크
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const Pagination = ({
	minVal,
	maxVal,
	isPrevInclude,
	isNextInclude,
	goToLink,
	prevLink,
	nextLink,
}) => {
	const numbers = Array.from(
		{ length: maxVal - minVal + 1 },
		(_, i) => minVal + i
	);
	return (
		<StyledDiv>
			{isPrevInclude && <NavLink to={prevLink}>이전 페이지</NavLink>}
			{numbers.map((num) => (
				<NavLink key={num} to={goToLink(num)}>
					{num}
				</NavLink>
			))}
			{isNextInclude && <NavLink to={nextLink}>다음 페이지</NavLink>}
		</StyledDiv>
	);
};

Pagination.propTypes = {
	minVal: PropTypes.number.isRequired,
	maxVal: PropTypes.number.isRequired,
	isPrevIncluded: PropTypes.bool,
	isNextIncluded: PropTypes.bool,
};
export default Pagination;
