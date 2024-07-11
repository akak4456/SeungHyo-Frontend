import React from 'react';
import ReactDOM from 'react-dom';
import styles from './reflection-note-list.module.css';
import Header from '../../header/header';
import InputBox from '../../components/inputbox';
import Dropdown from '../../components/dropdown';
import { NavLink } from 'react-router-dom';
import Pagination from '../../components/pagination';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import NormalButton from '../../components/button-normal';
const ReflectionNoteListTable = (props) => {
	return (
		<table className={styles.ReflectionNoteListTableRoot}>
			<tr>
				<th>제출번호</th>
				<th>문제</th>
				<th>결과</th>
				<th>메모리</th>
				<th>시간</th>
				<th>언어</th>
				<th>코드 길이</th>
				<th>제출한 시간</th>
			</tr>
			<tr>
				<td>1000</td>
				<td>
					<NavLink
						to={'/reflection-note/1000'}
						className={styles.reflectionNoteListCorrect}
					>
						A + B
					</NavLink>
				</td>
				<td className={styles.reflectionNoteListCorrect}>맞았습니다</td>
				<td>
					31120 <span className={styles.reflectionNoteListWrong}>KB</span>
				</td>
				<td>
					44 <span className={styles.reflectionNoteListWrong}>ms</span>
				</td>
				<td>C++</td>
				<td>
					528 <span className={styles.reflectionNoteListWrong}>B</span>
				</td>
				<td>11분전</td>
			</tr>
			<tr>
				<td>1000</td>
				<td>
					<NavLink
						to={'/reflection-note/1000'}
						className={styles.reflectionNoteListWrong}
					>
						A + B
					</NavLink>
				</td>
				<td className={styles.reflectionNoteListWrong}>틀렸습니다</td>
				<td>
					31120 <span className={styles.reflectionNoteListWrong}>KB</span>
				</td>
				<td>
					44 <span className={styles.reflectionNoteListWrong}>ms</span>
				</td>
				<td>C++</td>
				<td>
					528 <span className={styles.reflectionNoteListWrong}>B</span>
				</td>
				<td>11분전</td>
			</tr>
			<tr>
				<td>1000</td>
				<td>
					<NavLink
						to={'/reflection-note/1000'}
						className={styles.reflectionNoteListWrong}
					>
						A + B
					</NavLink>
				</td>
				<td className={styles.reflectionNoteListWrong}>틀렸습니다</td>
				<td>
					31120 <span className={styles.reflectionNoteListWrong}>KB</span>
				</td>
				<td>
					44 <span className={styles.reflectionNoteListWrong}>ms</span>
				</td>
				<td>C++</td>
				<td>
					528 <span className={styles.reflectionNoteListWrong}>B</span>
				</td>
				<td>11분전</td>
			</tr>
		</table>
	);
};
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
		<>
			<Header />
			<main className={styles.ReflectionNoteListRoot}>
				<div
					className={classNames(styles.ReflectionNoteListSearchContainer, {
						[styles.ReflectionNoteListSearchContainerTablet]: isTablet,
					})}
				>
					<div className={styles.ReflectionNoteListSearchInputBox}>
						<InputBox placeholder="문제" />
					</div>
					<Dropdown dropDownText={langDropDown} />
					<Dropdown dropDownText={resultDropDown} />
					<NormalButton type="primary" text="검색" />
				</div>
				<ReflectionNoteListTable />
				<div className={styles.ReflectionNoteListPaginationRoot}>
					<Pagination minVal={1} maxVal={10} goToLink={goToLink} />
				</div>
			</main>
		</>
	);
};
export default ReflectionNoteList;
