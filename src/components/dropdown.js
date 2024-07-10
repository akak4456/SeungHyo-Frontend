import React, { useState } from 'react';
import { CaretDownFill, Search } from 'react-bootstrap-icons';
import InputBox from '../common/input-box/input-box';
import styled, { css, keyframes } from 'styled-components';

const StyledContainerDiv = styled.div`
	width: 240px;
	height: 32px;
	position: relative;
`;

const StyledHeaderDiv = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid var(--color-input-border);
	display: flex;
	position: relative;
	box-sizing: border-box;
`;

const StyledCurTextP = styled.p`
	display: inline-block;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: 16px;
`;

const contentFadeIn = keyframes`
    0% {
        max-height: 0px;
        overflow-y: hidden;
    }
    99% {
        max-height: 165px; /* 32 * 5 + 5px*/
        overflow-y: hidden;
    }
    100% {
        max-height: 165px; /* 32 * 5 + 5px*/
        overflow-y: auto;
    }
`;

const contentFadeOut = keyframes`
    0% {
        max-height: 165px;
        overflow-y: hidden;
    }
    99% {
        max-height: 0px; /* 32 * 5 + 5px*/
        overflow-y: hidden;
    }
    100% {
        max-height: 0px; /* 32 * 5 + 5px*/
        overflow-y: hidden;
    }
`;

const StyledContentDiv = styled.div`
	position: absolute;
	top: 100%;
	width: 100%;
	box-sizing: border-box;
	margin-top: -1px;
	z-index: 999;
	max-height: ${(props) =>
		props.isOpen ? '165px' : '0px'}; /* isOpen 상태에 따라 max-height 조정 */
	overflow-y: hidden; /* 내용이 초과할 경우 숨김 처리 */
	animation-fill-mode: forwards;
	${(props) =>
		props.isOpen
			? css`
					animation: ${contentFadeIn} 0.5s linear;
				`
			: css`
					animation: ${contentFadeOut} 0.5s linear;
				`}
	border-top: 1px solid var(--color-input-border);
`;

const StyledSearchFormDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: -1px;
	& div {
		width: 32px;
		height: 32px;
		box-sizing: border-box;
		flex-shrink: 0;
		padding: 8px;
		background-color: var(--color-primary);
		margin-top: -1px;
	}
`;

const StyledListUl = styled.ul`
	width: 100%;
	border: 1px solid var(--color-input-border);
	box-sizing: border-box;
	margin-top: -1px;
`;

const StyledLi = styled.li`
	height: 32px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 16px;
	border-bottom: 1px solid var(--color-input-border);

	&:last-of-type {
		border-bottom: 0;
	}
	${(props) =>
		props.active
			? css`
					background-color: var(--color-primary);
					color: white;
				`
			: css`
					background-color: white;
				`}
`;

const StyledCaretDownFill = styled(CaretDownFill)`
	margin-left: auto;
	margin-top: auto;
	margin-bottom: auto;
	margin-right: 16px;
	transition: 0.5s;
	${(props) =>
		props.isOpen &&
		css`
			transform: rotate(180deg);
		`}
`;

/**
 * 드롭다운 컴포넌트를 나타냅니다.
 * @param {List<String>} dropDownText - drop down 에 들어가는 text 들을 배열로 지정함
 * @param {function(String)} onDropDownTextChange - drop down text 가 변경되었을 때 할 행동 지정함
 * @param {bool} isSearchIncluded - 드롭다운에 검색을 포함할 것인지 여부
 * @returns {JSX.Element} 사용자 이름을 출력하는 JSX 요소
 */
const Dropdown = ({ dropDownText, onDropDownTextChange, isSearchIncluded }) => {
	const [curText, setCurText] = useState(dropDownText[0]);
	const [isOpen, setIsOpen] = useState(false);

	const changeText = (text) => {
		setCurText(text);
		setIsOpen(false);
		if (onDropDownTextChange != null) {
			onDropDownTextChange(text);
		}
	};

	const listItem = dropDownText.map((text, index) => {
		return (
			<StyledLi
				key={index}
				active={curText == text}
				onClick={() => changeText(text)}
			>
				{text}
			</StyledLi>
		);
	});

	return (
		<StyledContainerDiv>
			<StyledHeaderDiv
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<StyledCurTextP>{curText}</StyledCurTextP>
				<StyledCaretDownFill isOpen={isOpen} />
			</StyledHeaderDiv>
			<StyledContentDiv isOpen={isOpen}>
				{isSearchIncluded && (
					<StyledSearchFormDiv>
						<InputBox type="text" placeholder="검색" />
						<div>
							<Search size={16} color="white" />
						</div>
					</StyledSearchFormDiv>
				)}
				<StyledListUl>{listItem}</StyledListUl>
			</StyledContentDiv>
		</StyledContainerDiv>
	);
};

export default Dropdown;
