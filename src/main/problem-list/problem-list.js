import React from 'react';
import ReactDOM from 'react-dom';
import styles from './problem-list.module.css';
import InputBox from '../../components/inputbox';
import { Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/pagination';

const ProblemListTable = (props) => {
	return (
		<table className={styles.ProblemListTableRoot}>
			<tr>
				<th>문제</th>
				<th>문제 제목</th>
				<th>정보</th>
				<th>맞힌 사람</th>
				<th>제출</th>
				<th>정답 비율</th>
			</tr>
			<tr>
				<td>1000</td>
				<td>
					<NavLink to={'/problem/1000'}>A + B</NavLink>
				</td>
				<td>다국어 태그</td>
				<td>269294</td>
				<td>1091136</td>
				<td>39.050%</td>
			</tr>
			<tr>
				<td>1000</td>
				<td>
					<NavLink to={'/problem/1000'}>A + B</NavLink>
				</td>
				<td>다국어 태그</td>
				<td>269294</td>
				<td>1091136</td>
				<td>39.050%</td>
			</tr>
			<tr>
				<td>1000</td>
				<td>
					<NavLink to={'/problem/1000'}>A + B</NavLink>
				</td>
				<td>다국어 태그</td>
				<td>269294</td>
				<td>1091136</td>
				<td>39.050%</td>
			</tr>
		</table>
	);
};
const ProblemList = (props) => {
	const goToLink = (num) => {
		return num + '';
	};
	return (
		<main>
			<div className={styles.ProblemListSearchForm}>
				<InputBox type="text" placeholder="검색"></InputBox>
				<div>
					<Search size={16} color="white" />
				</div>
			</div>
			<ProblemListTable />
			<div className={styles.ProblemListPaginationRoot}>
				<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
			</div>
		</main>
	);
};
export default ProblemList;
