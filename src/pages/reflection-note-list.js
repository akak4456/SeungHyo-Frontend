import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import Dropdown from '../components/dropdown';
import { NavLink } from 'react-router-dom';
import Pagination from '../components/pagination';
import NormalButton from '../components/button-normal';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
import { getReflectionNoteList } from '../api/Submit';
import { timeAgo } from '../util';
import { getAllProgramLanguage } from '../api/Submit';
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

	& .isWait {
		color: var(--color-wait);
	}
`;
const ReflectionNoteListTable = ({ pageData }) => {
	const getResultClassName = (submitResult) => {
		if (submitResult === 'CORRECT') {
			return 'isCorrect';
		} else if (submitResult === 'WAIT') {
			return 'isWait';
		} else {
			return 'isWrong';
		}
	};
	const getResult = (submitResult) => {
		if (submitResult === 'CORRECT') {
			return '맞았습니다';
		} else if (submitResult === 'WAIT') {
			return '채점중';
		} else {
			return '틀렸습니다';
		}
	};
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
				{pageData &&
					pageData.content &&
					pageData.content.map((submit) => (
						<tr>
							<td>{submit.submitNo}</td>
							<td>
								<NavLink
									to={`/reflection-note/${submit.submitNo}`}
									className={getResultClassName(submit.submitResult)}
								>
									{submit.problemTitle}
								</NavLink>
							</td>
							<td className={getResultClassName(submit.submitResult)}>
								{getResult(submit.submitResult)}
							</td>
							<td>{submit.langName}</td>
							<td>{timeAgo(submit.submitDate)}</td>
						</tr>
					))}
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
	const resultDropDown = ['모든 결과', '맞았습니다', '틀렸습니다'];
	const isTablet = useMediaQuery({
		query: '(max-width:1050px)',
	});

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
	const search = (title, langCode, langName, curResult, resultCode) => {
		searchParams.set('page', 0);
		searchParams.set('size', size);
		searchParams.set('title', encodeURIComponent(title));
		searchParams.set('langCode', langCode);
		searchParams.set('langName', langName);
		searchParams.set('curResult', curResult);
		searchParams.set('resultCode', resultCode);
		setSearchParams(searchParams);
	};
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page')) || 0;
	const size = parseInt(searchParams.get('size')) || 10;
	const title = searchParams.get('title');
	const langCode = searchParams.get('langCode') || 'ALL';
	const langName = searchParams.get('langName') || '모든 언어';
	const curResult = searchParams.get('curResult') || resultDropDown[0];
	const resultCode = searchParams.get('resultCode') || 'ALL';
	const [pageData, setPageData] = useState();
	const [langData, setLangData] = useState();
	const [form, setForm] = useState();
	useEffect(() => {
		getReflectionNoteList(
			page,
			size,
			title,
			langCode,
			resultCode,
			(response) => {
				setPageData(response.data.data);
			},
			(exception) => {}
		);
		getAllProgramLanguage(
			(response) => {
				const data = response.data.data;
				setLangData(data);
				setForm((state) => ({
					...state,
					langCode: langCode,
					langName: langName,
					curResult: curResult,
					resultCode: resultCode,
				}));
			},
			(exception) => {}
		);
	}, [page, size, title, langCode, resultCode]);
	const startPage = Math.floor(page / size) * size + 1;
	let endPage = startPage + size - 1;
	if (pageData && endPage > pageData.totalPages) {
		endPage = pageData.totalPages;
	}
	return (
		<ReflectionNoteListRootMain>
			<ReflectionNoteListSearchContainerDiv $isTablet={isTablet}>
				<ReflectionNoteListSearchInputBoxDiv>
					<InputBox
						placeholder="문제"
						onChange={(value) => {
							setForm((state) => ({
								...state,
								searchTitle: value,
							}));
						}}
					/>
				</ReflectionNoteListSearchInputBoxDiv>
				{langData && (
					<Dropdown
						dropDownText={[
							'모든 언어',
							...langData.languageList.map((lang) => lang.langName),
						]}
						curText={form.langName}
						onDropDownTextChange={(text) => {
							let newLangCode = 'ALL';
							if (text !== '모든 언어') {
								newLangCode = langData.languageList.find(
									(lang) => lang.langName == text
								).langCode;
							}
							if (form.langCode != newLangCode) {
								setForm((state) => ({
									...state,
									langName: text,
									langCode: newLangCode,
								}));
							}
						}}
					/>
				)}
				{form && form.curResult && (
					<Dropdown
						dropDownText={resultDropDown}
						curText={form.curResult}
						onDropDownTextChange={(text) => {
							if (text != form.curResult) {
								let resultCode = 'ALL';
								if (text === resultDropDown[1]) {
									resultCode = 'CORRECT';
								} else if (text === resultDropDown[2]) {
									resultCode = 'WRONG';
								}
								setForm((state) => ({
									...state,
									curResult: text,
									resultCode: resultCode,
								}));
							}
						}}
					/>
				)}
				<NormalButton
					type="primary"
					text="검색"
					onClick={() => {
						if (form.searchTitle) {
							search(
								form.searchTitle,
								form.langCode,
								form.langName,
								form.curResult,
								form.resultCode
							);
						} else {
							alert('문제 제목을 입력해주세요');
						}
					}}
				/>
			</ReflectionNoteListSearchContainerDiv>
			<ReflectionNoteListTable pageData={pageData} />
			<ReflectionNoteListPaginationRoot>
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
			</ReflectionNoteListPaginationRoot>
		</ReflectionNoteListRootMain>
	);
};
export default ReflectionNoteList;
