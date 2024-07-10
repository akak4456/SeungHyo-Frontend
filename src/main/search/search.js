import React from 'react';
import ReactDOM from 'react-dom';
import styles from './search.module.css';
import Header from '../../header/header';
import { Search } from 'react-bootstrap-icons';
import InputBox from '../../common/input-box/input-box';
import Pagination from '../../components/pagination';
const SearchItem = (props) => {
	return (
		<div className={styles.SearchItemRoot}>
			<p className={styles.SearchItemTitle}>{props.title}</p>
			<p className={styles.SearchItemConstraint}>{props.constraint}</p>
			<p className={styles.SearchItemContent}>{props.content}</p>
		</div>
	);
};
const SearchPage = (props) => {
	const goToLink = (num) => {
		return num + '';
	};
	return (
		<>
			<Header />
			<main>
				<div className={styles.SearchFormRoot}>
					<span>검색</span>
					<div className={styles.SearchFormInput}>
						<InputBox type="text" placeholder="검색"></InputBox>
						<div>
							<Search size={16} color="white" />
						</div>
					</div>
				</div>
				<p className={styles.SearchFormResult}>검색 결과 29896개 (0.001초)</p>
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
				<div className={styles.SearchPaginationRoot}>
					<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
				</div>
			</main>
		</>
	);
};
export default SearchPage;
