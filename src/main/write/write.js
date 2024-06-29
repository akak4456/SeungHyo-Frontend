import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './write.module.css';
import Header from '../../header/header';
import InputBox from '../../common/input-box/input-box';
import Dropdown from '../../common/dropdown/dropdown';
import AceEditor from 'react-ace';
import PrimaryButton from '../../common/button/primary/primary-button';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
function onChange(newValue) {
	console.log('change', newValue);
}
const Write = () => {
	const categories = ['질문', '자유', '기타'];
	const languages = ['JAVA', 'C', 'C++'];

	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [text, setText] = useState();
	const onEditorStateChange = function (editorState) {
		setEditorState(editorState);
		const { blocks } = convertToRaw(editorState.getCurrentContent());
		let text = editorState.getCurrentContent().getPlainText('\u0001');
		setText(text);
	};
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
							<div className={styles.WriteTableEditorRoot}>
								<Editor
									editorState={editorState}
									toolbarClassName={styles.WriteTableEditorToolbar}
									wrapperClassName={styles.WriteTableEditorWrapper}
									editorClassName={styles.WriteTableEditorMain}
									onEditorStateChange={onEditorStateChange}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}>소스코드</td>
						<td className={styles.WriteTableRight}>
							<AceEditor
								mode="java"
								theme="github"
								onChange={onChange}
								name="sourceEditor"
								width="100%"
								editorProps={{ $blockScrolling: true }}
							/>
						</td>
					</tr>
					<tr>
						<td className={styles.WriteTableLeft}></td>
						<td className={styles.WriteTableRight}>
							<PrimaryButton buttonText={'글쓰기'}></PrimaryButton>
						</td>
					</tr>
				</table>
			</main>
		</>
	);
};

export default Write;
