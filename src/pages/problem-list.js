import React from 'react';
import styled, { css } from 'styled-components';
import InputBox from '../components/inputbox';
import { Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Pagination from '../components/pagination';
const StyledProblemListTable = styled.table`
	width: 75%;
	margin-left: 12.5%;
	margin-top: 24px;

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
const ProblemListTable = (props) => {
	return (
		<StyledProblemListTable>
			<colgroup>
				<col width="10%" />
				<col width="45%" />
				<col width="15%" />
				<col width="15%" />
				<col width="15%" />
			</colgroup>
			<thead>
				<tr>
					<th>문제</th>
					<th>문제 제목</th>
					<th>맞힌 사람</th>
					<th>제출</th>
					<th>정답 비율</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1000</td>
					<td>
						<NavLink to={'/problem/1000'}>A + B</NavLink>
					</td>
					<td>269294</td>
					<td>1091136</td>
					<td>39.050%</td>
				</tr>
				<tr>
					<td>1000</td>
					<td>
						<NavLink to={'/problem/1000'}>A + B</NavLink>
					</td>
					<td>269294</td>
					<td>1091136</td>
					<td>39.050%</td>
				</tr>
				<tr>
					<td>1000</td>
					<td>
						<NavLink to={'/problem/1000'}>A + B</NavLink>
					</td>
					<td>269294</td>
					<td>1091136</td>
					<td>39.050%</td>
				</tr>
			</tbody>
		</StyledProblemListTable>
	);
};
const ProblemListSearchFormDiv = styled.div`
	padding-left: 12.5%;
	padding-right: 12.5%;
	display: flex;
	margin-top: 48px;
	box-sizing: border-box;

	& div:last-child {
		width: 32px;
		height: 32px;
		box-sizing: border-box;
		flex-shrink: 0;
		padding: 8px;
		background-color: var(--color-primary);
	}
`;
const ProblemListPaginationRootDiv = styled.div`
	width: 100%;
	margin-top: 24px;
	display: flex;
	& div {
		margin: 0 auto;
	}
`;
const ProblemList = (props) => {
	const goToLink = (num) => {
		return num + '';
	};
	return (
		<main>
			<ProblemListSearchFormDiv>
				<InputBox type="text" placeholder="검색"></InputBox>
				<div>
					<Search size={16} color="white" />
				</div>
			</ProblemListSearchFormDiv>
			<ProblemListTable />
			<ProblemListPaginationRootDiv>
				<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
			</ProblemListPaginationRootDiv>
		</main>
	);
};
export default ProblemList;
