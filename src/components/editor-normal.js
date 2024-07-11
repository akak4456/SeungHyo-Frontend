import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
const EditorWrapper = styled.div`
	.NormalEditorMain {
		height: 500px !important;
		border: 1px solid #f1f1f1 !important;
		padding: 5px !important;
		border-radius: 2px !important;
	}
`;
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
		<EditorWrapper>
			<Editor
				editorState={editorState}
				toolbarClassName="NormalEditorToolbar"
				wrapperClassName="NormalEditorWrapper"
				editorClassName="NormalEditorMain"
				onEditorStateChange={onEditorStateChange}
			/>
		</EditorWrapper>
	);
};

export default NormalEditor;
