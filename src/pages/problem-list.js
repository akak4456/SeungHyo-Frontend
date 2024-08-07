import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import InputBox from '../components/inputbox';
import { Search } from 'react-bootstrap-icons';
import { NavLink, useSearchParams } from 'react-router-dom';
import Pagination from '../components/pagination';
import { getProblemList } from '../api/Problem';
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
const ProblemListTable = ({ pageData }) => {
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
				{pageData &&
					pageData.content &&
					pageData.content.map((problem) => (
						<tr key={problem.problemNo + problem.problemTitle}>
							<td>{problem.problemNo}</td>
							<td>
								<NavLink to={'/problem/' + problem.problemNo}>
									{problem.problemTitle}
								</NavLink>
							</td>
							<td>{problem.correctPeopleCount}</td>
							<td>{problem.submitCount}</td>
							<td>{problem.correctRatio * 100}%</td>
						</tr>
					))}
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
	const prevLink = () => {
		searchParams.set('page', startPage - 1 - 1);
		searchParams.set('size', 10);
		setSearchParams(searchParams);
	};
	const nextLink = () => {
		searchParams.set('page', endPage + 1 - 1);
		searchParams.set('size', 10);
		setSearchParams(searchParams);
	};
	const goToLink = (num) => {
		searchParams.set('page', num - 1);
		searchParams.set('size', 10);
		setSearchParams(searchParams);
	};
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page')) || 0;
	const size = parseInt(searchParams.get('size')) || 10;
	const [pageData, setPageData] = useState();
	useEffect(() => {
		getProblemList(page, size, (data) => {
			setPageData(data);
		});
	}, [page, size]);
	const startPage = Math.floor(page / size) * size + 1;
	let endPage = startPage + size - 1;
	if (pageData && endPage > pageData.totalPages) {
		endPage = pageData.totalPages;
	}
	return (
		<main>
			<ProblemListSearchFormDiv>
				<InputBox type="text" placeholder="검색"></InputBox>
				<div>
					<Search size={16} color="white" />
				</div>
			</ProblemListSearchFormDiv>
			<ProblemListTable pageData={pageData} />
			<ProblemListPaginationRootDiv>
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
			</ProblemListPaginationRootDiv>
		</main>
	);
};
export default ProblemList;
