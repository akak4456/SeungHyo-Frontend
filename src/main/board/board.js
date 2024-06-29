import React from 'react';
import ReactDOM from 'react-dom';
import styles from './board.module.css';
import Header from '../../header/header';
import { NavLink, useNavigate } from 'react-router-dom';
import Pagination from '../../common/pagination/pagination';
import { HandThumbsUp } from 'react-bootstrap-icons';
import InputBox from '../../common/input-box/input-box';
import PrimaryButton from '../../common/button/primary/primary-button';
const BoardTapButton = (props) => {
	return (
		<div
			style={{
				padding: '8px',
				backgroundColor: props.isActive
					? 'var(--color-primary)'
					: 'transparent',
				color: props.isActive ? 'white' : 'var(--color-normal-text-color)',
				fontSize: '14px',
				cursor: 'pointer',
			}}
			onClick={props.onClick}
		>
			{props.text}
		</div>
	);
};
const BoardTable = (props) => {
	return (
		<table className={styles.BoardTableRoot}>
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
			<tr className={styles.BoardTableNoticeRow}>
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
			<tr className={styles.BoardTableNoticeRow}>
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
		</table>
	);
};
const Board = (props) => {
	const navigate = useNavigate();
	const goToLink = (num) => {
		return num + '';
	};
	return (
		<>
			<Header />
			<main className={styles.BoardRoot}>
				<div className={styles.BoardTapButtons}>
					<BoardTapButton text={'전체'} isActive={true} />
					<BoardTapButton text={'공지'} />
					<BoardTapButton text={'자유'} />
					<BoardTapButton text={'질문'} />
					<BoardTapButton text={'홍보'} />
					<BoardTapButton text={'글쓰기'} onClick={() => navigate('/write')} />
				</div>
				<BoardTable />
				<div className={styles.BoardSearchForm}>
					<div style={{ width: '240px' }}>
						<InputBox placeholder={'검색'} />
					</div>
					<PrimaryButton buttonText={'검색'} />
				</div>
				<div className={styles.BoardPaginationRoot}>
					<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
				</div>
			</main>
		</>
	);
};
export default Board;
