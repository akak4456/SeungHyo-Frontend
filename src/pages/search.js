import React from 'react';
import styled from 'styled-components';
import { Search } from 'react-bootstrap-icons';
import InputBox from '../components/inputbox';
import Pagination from '../components/pagination';
const SearchItemRootDiv = styled.div`
	width: 75%;
	margin-left: 12.5%;
	border-bottom: 1px solid var(--color-white-gray);
	margin-top: 24px;
`;
const SearchItemTitle = styled.p`
	font-size: 18px;
	color: var(--color-search-item-title);
`;
const SearchItemConstraint = styled.p`
	font-size: 13px;
	margin-top: 16px;
	color: var(--color-search-result);
`;
const SearchItemContent = styled.p`
	font-size: 13px;
	color: var(--color-search-item-title);
	margin-top: 16px;
	margin-bottom: 16px;
`;
const SearchItem = (props) => {
	return (
		<SearchItemRootDiv>
			<SearchItemTitle>{props.title}</SearchItemTitle>
			<SearchItemConstraint>{props.constraint}</SearchItemConstraint>
			<SearchItemContent>{props.content}</SearchItemContent>
		</SearchItemRootDiv>
	);
};
const SearchFormRootDiv = styled.div`
	background-color: var(--color-top-title);
	padding-top: 90px;
	padding-bottom: 90px;
	padding-left: 12.5%;
	padding-right: 12.5%;
	border-bottom: 1px solid var(--color-white-gray);
	display: flex;
	flex-direction: column;
	& span {
		font-size: 30px;
		color: var(--color-normal-text-color);
		margin-left: auto;
		margin-right: auto;
	}
`;
const SearchFormInputDiv = styled.div`
	display: flex;
	margin-top: 48px;
	box-sizing: border-box;
	& div {
		width: 32px;
		height: 32px;
		box-sizing: border-box;
		flex-shrink: 0;
		padding: 8px;
		background-color: var(--color-primary);
	}
`;
const SearchFormResult = styled.p`
	color: var(--color-search-result);
	padding-left: 12.5%;
	padding-right: 12.5%;
	margin-top: 24px;
	font-size: 13px;
`;
const SearchPaginationRootDiv = styled.div`
	width: 100%;
	margin-top: 24px;
	display: flex;
	& div {
		margin: 0 auto;
	}
`;
const SearchPage = (props) => {
	const goToLink = (num) => {
		return num + '';
	};
	return (
		<main>
			<SearchFormRootDiv>
				<span>검색</span>
				<SearchFormInputDiv>
					<InputBox type="text" placeholder="검색"></InputBox>
					<div>
						<Search size={16} color="white" />
					</div>
				</SearchFormInputDiv>
			</SearchFormRootDiv>
			<SearchFormResult>검색 결과 29896개 (0.001초)</SearchFormResult>
			<SearchItem
				title={'1000번. A+B'}
				constraint={'시간 제한: 2초 메모리 제한: 128MB'}
				content={'두 정수 A와 B를 입력받은 다음 A+B를 출력하세요.'}
			/>
			<SearchItem
				title={'1000번. A+B'}
				constraint={'시간 제한: 2초 메모리 제한: 128MB'}
				content={'두 정수 A와 B를 입력받은 다음 A+B를 출력하세요.'}
			/>
			<SearchPaginationRootDiv>
				<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
			</SearchPaginationRootDiv>
		</main>
	);
};
export default SearchPage;
