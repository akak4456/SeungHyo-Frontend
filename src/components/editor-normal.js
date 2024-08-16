import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
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
const NormalEditor = ({ onHTMLChange }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const onEditorStateChange = function (editorState) {
		setEditorState(editorState);
		const editorToHtml = draftToHtml(
			convertToRaw(editorState.getCurrentContent())
		);
		onHTMLChange(editorToHtml);
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
