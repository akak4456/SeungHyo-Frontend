import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './normal-editor.module.css';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const NormalEditor = (props) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [text, setText] = useState();
	const onEditorStateChange = function (editorState) {
		setEditorState(editorState);
		const { blocks } = convertToRaw(editorState.getCurrentContent());
		let text = editorState.getCurrentContent().getPlainText('\u0001');
		setText(text);
	};
	return (
		<Editor
			editorState={editorState}
			toolbarClassName={styles.NormalEditorToolbar}
			wrapperClassName={styles.NormalEditorWrapper}
			editorClassName={styles.NormalEditorMain}
			onEditorStateChange={onEditorStateChange}
		/>
	);
};

export default NormalEditor;
