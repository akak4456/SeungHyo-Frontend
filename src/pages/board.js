import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination';
import { HandThumbsUp } from 'react-bootstrap-icons';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { useIsMobile } from '../hooks/media-query';
const BoardTapButton = (props) => {
	return (
		<div
			style={{
				padding: '8px',
				backgroundColor: props.isActive
					? 'var(--color-primary)'
					: 'transparent',
				color: props.isActive ? 'white' : 'var(--color-normal-text-color)',
				fontSize: 'min(3vw, 14px)',
				cursor: 'pointer',
			}}
			onClick={props.onClick}
		>
			{props.text}
		</div>
	);
};
const StyledBoardTable = styled.table`
	margin-top: 24px;
	width: 100%;
	& .noticeRow {
		background-color: var(--color-notice);
	}
	& tr:not(.noticeRow):nth-of-type(2n + 1) {
		background-color: var(--color-light-gray);
	}

	&,
	& th,
	& td {
		border-collapse: collapse;
		border: 1px solid var(--color-white-gray);
	}

	& th,
	& td {
		text-align: left;
		padding: min(1vw, 8px);
		font-size: min(1.5vw, 12px);
	}

	& td a {
		text-decoration: none;
		color: var(--color-primary);
	}
`;

const BoardTable = (props) => {
	return (
		<StyledBoardTable>
			<colgroup>
				<col width="35%" />
				<col width="15%" />
				<col width="10%" />
				<col width="10%" />
				<col width="10%" />
				<col width="10%" />
				<col width="10%" />
			</colgroup>
			<thead>
				<tr>
					<th>제목</th>
					<th>카테고리</th>
					<th>언어</th>
					<th>글쓴이</th>
					<th>댓글</th>
					<th>
						<HandThumbsUp size={'16px'}></HandThumbsUp>
					</th>
					<th>작성일</th>
				</tr>
			</thead>
			<tbody>
				<tr className="noticeRow">
					<td>
						<NavLink to={'/article/1000'}>2024-05-06 서버 장애 안내</NavLink>
					</td>
					<td>
						<NavLink to={'#'}>공지</NavLink>
					</td>
					<td>node.js</td>
					<td style={{ fontWeight: 'bold' }}>starlink</td>
					<td>1</td>
					<td>30</td>
					<td>8일전</td>
				</tr>
				<tr className="noticeRow">
					<td>
						<NavLink to={'/article/1000'}>2024-05-06 서버 장애 안내</NavLink>
					</td>
					<td>
						<NavLink to={'#'}>공지</NavLink>
					</td>
					<td>node.js</td>
					<td style={{ fontWeight: 'bold' }}>starlink</td>
					<td>1</td>
					<td>30</td>
					<td>8일전</td>
				</tr>
				<tr>
					<td>
						<NavLink to={'/article/1000'}>글제목</NavLink>
					</td>
					<td>
						<NavLink to={'#'}>카테고리</NavLink>
					</td>
					<td>C++</td>
					<td style={{ fontWeight: 'bold' }}>akak4456</td>
					<td>1</td>
					<td>30</td>
					<td>8일전</td>
				</tr>
				<tr>
					<td>
						<NavLink to={'/article/1000'}>글제목</NavLink>
					</td>
					<td>
						<NavLink to={'#'}>카테고리</NavLink>
					</td>
					<td>C++</td>
					<td style={{ fontWeight: 'bold' }}>akak4456</td>
					<td>1</td>
					<td>30</td>
					<td>8일전</td>
				</tr>
				<tr>
					<td>
						<NavLink to={'/article/1000'}>글제목</NavLink>
					</td>
					<td>
						<NavLink to={'#'}>카테고리</NavLink>
					</td>
					<td>C++</td>
					<td style={{ fontWeight: 'bold' }}>akak4456</td>
					<td>1</td>
					<td>30</td>
					<td>8일전</td>
				</tr>
				<tr>
					<td>
						<NavLink to={'/article/1000'}>글제목</NavLink>
					</td>
					<td>
						<NavLink to={'#'}>카테고리</NavLink>
					</td>
					<td>C++</td>
					<td style={{ fontWeight: 'bold' }}>akak4456</td>
					<td>1</td>
					<td>30</td>
					<td>8일전</td>
				</tr>
			</tbody>
		</StyledBoardTable>
	);
};
const BoardRootMain = styled.main`
	width: 75%;
	margin-left: 12.5%;
	margin-top: 48px;
`;
const BoardTapButtonsDiv = styled.div`
	display: flex;
	flex-direction: row;
`;
const BoardSearchFormDiv = styled.div`
	width: 100%;
	margin-top: 24px;
	display: flex;
	flex-direction: row;
	align-items: center;
	& div {
		margin-left: auto;
		width: ${({ $isMobile }) => ($isMobile ? 'auto' : '240px')};
	}
	& button {
		height: 32px;
		margin-right: auto;
	}
`;

const BoardPaginationRootDiv = styled.div`
	width: 100%;
	margin-top: 24px;
	display: flex;
	& div {
		margin: 0 auto;
	}
`;
const Board = (props) => {
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	const goToLink = (num) => {
		return num + '';
	};
	return (
		<BoardRootMain>
			<BoardTapButtonsDiv>
				<BoardTapButton text={'전체'} isActive={true} />
				<BoardTapButton text={'공지'} />
				<BoardTapButton text={'자유'} />
				<BoardTapButton text={'질문'} />
				<BoardTapButton text={'홍보'} />
				<BoardTapButton text={'글쓰기'} onClick={() => navigate('/write')} />
			</BoardTapButtonsDiv>
			<BoardTable />
			<BoardSearchFormDiv $isMobile={isMobile}>
				<InputBox placeholder={'검색'} />
				<NormalButton type="primary" text="검색" />
			</BoardSearchFormDiv>
			<BoardPaginationRootDiv>
				<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
			</BoardPaginationRootDiv>
		</BoardRootMain>
	);
};
export default Board;
