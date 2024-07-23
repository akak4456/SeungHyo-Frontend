import React from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import Dropdown from '../components/dropdown';
import { NavLink } from 'react-router-dom';
import Pagination from '../components/pagination';
import NormalButton from '../components/button-normal';
import { useMediaQuery } from 'react-responsive';
const StyledReflectionNoteListTable = styled.table`
	margin-top: 24px;
	&,
	& th,
	& td {
		border-collapse: collapse;
		border: 1px solid var(--color-white-gray);
	}

	& tr:nth-child(2n) {
		background-color: var(--color-light-gray);
	}

	& th,
	& td {
		text-align: left;
		padding: min(1vw, 8px);
		font-size: min(1.5vw, 12px);
	}

	& td a {
		text-decoration: none;
	}
	& .isCorrect {
		color: var(--color-correct);
		font-weight: bold;
	}
	& .isWrong {
		color: var(--color-wrong);
	}
`;
const ReflectionNoteListTable = (props) => {
	return (
		<StyledReflectionNoteListTable>
			<colgroup>
				<col width="15%" />
				<col width="40%" />
				<col width="15%" />
				<col width="15%" />
				<col width="15%" />
			</colgroup>
			<thead>
				<tr>
					<th>제출번호</th>
					<th>문제</th>
					<th>결과</th>
					<th>언어</th>
					<th>제출한 시간</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1000</td>
					<td>
						<NavLink to={'/reflection-note/1000'} className="isCorrect">
							A + B
						</NavLink>
					</td>
					<td className="isCorrect">맞았습니다</td>
					<td>C++</td>
					<td>11분전</td>
				</tr>
				<tr>
					<td>1000</td>
					<td>
						<NavLink to={'/reflection-note/1000'} className="isWrong">
							A + B
						</NavLink>
					</td>
					<td className="isWrong">틀렸습니다</td>
					<td>C++</td>
					<td>11분전</td>
				</tr>
				<tr>
					<td>1000</td>
					<td>
						<NavLink to={'/reflection-note/1000'} className="isWrong">
							A + B
						</NavLink>
					</td>
					<td className="isWrong">틀렸습니다</td>
					<td>C++</td>
					<td>11분전</td>
				</tr>
			</tbody>
		</StyledReflectionNoteListTable>
	);
};
const ReflectionNoteListRootMain = styled.main`
	margin-left: 12.5%;
	width: 75%;
	display: flex;
	margin-top: 48px;
	flex-direction: column;
`;
const ReflectionNoteListSearchContainerDiv = styled.div`
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: ${({ $isTablet }) => ($isTablet ? 'column' : 'row')};
	gap: 8px;
	& button {
		height: 32px;
	}
`;
const ReflectionNoteListSearchInputBoxDiv = styled.div`
	width: 240px;
`;
const ReflectionNoteListPaginationRoot = styled.div`
	width: 100%;
	margin-top: 24px;
	display: flex;
	& div {
		margin: 0 auto;
	}
`;
const ReflectionNoteList = (props) => {
	const goToLink = (num) => {
		return num + '';
	};
	const langDropDown = ['모든 언어', 'JAVA', 'C', 'C++', '아희'];
	const resultDropDown = ['모든 결과', '맞았습니다', '틀렸습니다'];
	const isTablet = useMediaQuery({
		query: '(max-width:1050px)',
	});
	return (
		<ReflectionNoteListRootMain>
			<ReflectionNoteListSearchContainerDiv $isTablet={isTablet}>
				<ReflectionNoteListSearchInputBoxDiv>
					<InputBox placeholder="문제" />
				</ReflectionNoteListSearchInputBoxDiv>
				<Dropdown dropDownText={langDropDown} />
				<Dropdown dropDownText={resultDropDown} />
				<NormalButton type="primary" text="검색" />
			</ReflectionNoteListSearchContainerDiv>
			<ReflectionNoteListTable />
			<ReflectionNoteListPaginationRoot>
				<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
			</ReflectionNoteListPaginationRoot>
		</ReflectionNoteListRootMain>
	);
};
export default ReflectionNoteList;
