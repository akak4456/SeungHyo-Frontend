import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './write.module.css';
import Header from '../../header/header';
import InputBox from '../../common/input-box/input-box';
import Dropdown from '../../common/dropdown/dropdown';
import NormalEditor from '../../components/editor-normal/normal-editor';
import SourceEditor from '../../components/editor-source/source-editor';
import NormalButton from '../../components/button-normal';
const Write = () => {
	const categories = ['질문', '자유', '기타'];
	const languages = ['JAVA', 'C', 'C++'];
	return (
		<>
			<Header></Header>
			<main className={styles.WriteRoot}>
				<table className={styles.WriteTable}>
					<tr>
						<td className={styles.WriteTableLeft}>제목</td>
						<td className={styles.WriteTableRight}>
							<InputBox />
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}>카테고리</td>
						<td className={styles.WriteTableRight}>
							<Dropdown dropDownText={categories} />
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}>언어</td>
						<td className={styles.WriteTableRight}>
							<Dropdown dropDownText={languages} />
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}>문제번호</td>
						<td className={styles.WriteTableRight}>
							<InputBox />
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}>내용</td>
						<td className={styles.WriteTableRight}>
							<NormalEditor />
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}>소스코드</td>
						<td className={styles.WriteTableRight}>
							<SourceEditor />
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}></td>
						<td className={styles.WriteTableRight}>
							<NormalButton type="primary" text="글쓰기"></NormalButton>
						</td>
					</tr>
				</table>
			</main>
		</>
	);
};

export default Write;
