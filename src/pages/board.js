import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination';
import { HandThumbsUp } from 'react-bootstrap-icons';
import InputBox from '../components/inputbox';
import NormalButton from '../components/button-normal';
import { useIsMobile } from '../hooks/media-query';
import { useSearchParams } from 'react-router-dom';
import { getBoardList } from '../api/Board';
import { timeAgo } from '../util';
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

const BoardTable = ({ pageData, noticeData, moveCategory }) => {
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
				{noticeData &&
					noticeData.content &&
					noticeData.content.map((board) => (
						<tr key={board.boardNo + 'board'} className="noticeRow">
							<td>
								<NavLink to={'/article/' + board.boardNo}>
									{board.boardTitle}
								</NavLink>
							</td>
							<td>
								<NavLink onClick={() => moveCategory(board.categoryCode)}>
									{board.categoryName}
								</NavLink>
							</td>
							<td>{board.langName}</td>
							<td style={{ fontWeight: 'bold' }}>{board.memberId}</td>
							<td>{board.replyCount}</td>
							<td>{board.likeCount}</td>
							<td>{timeAgo(board.regDate)}</td>
						</tr>
					))}
				{pageData &&
					pageData.content &&
					pageData.content.map((board) => (
						<tr key={board.boardNo + 'board'}>
							<td>
								<NavLink to={'/article/' + board.boardNo}>
									{board.boardTitle}
								</NavLink>
							</td>
							<td>
								<NavLink onClick={() => moveCategory(board.categoryCode)}>
									{board.categoryName}
								</NavLink>
							</td>
							<td>{board.langName}</td>
							<td style={{ fontWeight: 'bold' }}>{board.memberId}</td>
							<td>{board.replyCount}</td>
							<td>{board.likeCount}</td>
							<td>{timeAgo(board.regDate)}</td>
						</tr>
					))}
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
	const prevLink = () => {
		searchParams.set('page', startPage - 1 - 1);
		searchParams.set('size', 10);
		searchParams.set('categoryCode', searchParams.categoryCode || 'ALL');
		setSearchParams(searchParams);
	};
	const nextLink = () => {
		searchParams.set('page', endPage + 1 - 1);
		searchParams.set('size', 10);
		searchParams.set('categoryCode', searchParams.categoryCode || 'ALL');
		setSearchParams(searchParams);
	};
	const goToLink = (num) => {
		searchParams.set('page', num - 1);
		searchParams.set('size', 10);
		searchParams.set('categoryCode', searchParams.categoryCode || 'ALL');
		setSearchParams(searchParams);
	};
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page')) || 0;
	const size = parseInt(searchParams.get('size')) || 10;
	const categoryCode = searchParams.get('categoryCode') || 'ALL';
	const [pageData, setPageData] = useState();
	const [noticeData, setNoticeData] = useState();
	const moveCategory = (categoryCode) => {
		console.log(categoryCode);
		searchParams.set('page', 0);
		searchParams.set('size', parseInt(searchParams.get('size')) || 10);
		searchParams.set('categoryCode', categoryCode);
		setSearchParams(searchParams);
	};
	useEffect(() => {
		getBoardList(
			page,
			size,
			categoryCode,
			(response) => {
				console.log(response);
				setPageData(response.data.data);
			},
			(exception) => {}
		);
		if (categoryCode === 'ALL') {
			getBoardList(
				0,
				3,
				'NOTICE',
				(response) => {
					setNoticeData(response.data.data);
				},
				(exception) => {}
			);
		} else {
			setNoticeData(null);
		}
	}, [page, size, categoryCode]);
	const startPage = Math.floor(page / size) * size + 1;
	let endPage = startPage + size - 1;
	if (pageData && endPage > pageData.totalPages) {
		endPage = pageData.totalPages;
	}
	return (
		<BoardRootMain>
			<BoardTapButtonsDiv>
				<BoardTapButton
					text={'전체'}
					isActive={categoryCode === 'ALL'}
					onClick={() => moveCategory('ALL')}
				/>
				<BoardTapButton
					text={'공지'}
					isActive={categoryCode === 'NOTICE'}
					onClick={() => moveCategory('NOTICE')}
				/>
				<BoardTapButton
					text={'자유'}
					isActive={categoryCode === 'FREE'}
					onClick={() => moveCategory('FREE')}
				/>
				<BoardTapButton
					text={'질문'}
					isActive={categoryCode === 'QNA'}
					onClick={() => moveCategory('QNA')}
				/>
				<BoardTapButton
					text={'홍보'}
					isActive={categoryCode === 'AD'}
					onClick={() => moveCategory('AD')}
				/>
				<BoardTapButton text={'글쓰기'} onClick={() => navigate('/write')} />
			</BoardTapButtonsDiv>
			<BoardTable
				pageData={pageData}
				noticeData={noticeData}
				moveCategory={moveCategory}
			/>
			<BoardSearchFormDiv $isMobile={isMobile}>
				<InputBox placeholder={'검색'} />
				<NormalButton type="primary" text="검색" />
			</BoardSearchFormDiv>
			<BoardPaginationRootDiv>
				<Pagination
					prevLink={prevLink}
					nextLink={nextLink}
					minVal={startPage}
					maxVal={endPage}
					goToLink={goToLink}
					isPrevInclude={startPage != 1}
					isNextInclude={pageData && endPage != pageData.totalPages}
					currentNum={page + 1}
				/>
			</BoardPaginationRootDiv>
		</BoardRootMain>
	);
};
export default Board;
