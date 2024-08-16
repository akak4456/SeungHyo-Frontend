import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled, { css } from 'styled-components';
const EditorWrapper = styled.div`
	.NormalEditorMain {
		height: 500px !important;
		${({ $isWarning }) =>
			$isWarning
				? css`
						border: 1px solid var(--color-danger) !important;
					`
				: css`
						border: 1px solid #f1f1f1 !important;
					`}
		padding: 5px !important;
		border-radius: 2px !important;
	}
`;
const StyledWarning = styled.span`
	color: var(--color-danger);
	font-size: 11px;
	margin-top: 8px;
`;
const NormalEditor = ({ onHTMLChange, warningMessage }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const onEditorStateChange = function (editorState) {
		setEditorState(editorState);
		const editorToHtml = draftToHtml(
			convertToRaw(editorState.getCurrentContent())
		);
		onHTMLChange(editorToHtml);
	};
	return (
		<EditorWrapper $isWarning={warningMessage}>
			<Editor
				editorState={editorState}
				toolbarClassName="NormalEditorToolbar"
				wrapperClassName="NormalEditorWrapper"
				editorClassName="NormalEditorMain"
				onEditorStateChange={onEditorStateChange}
			/>
			{warningMessage && <StyledWarning>{warningMessage}</StyledWarning>}
		</EditorWrapper>
	);
};

export default NormalEditor;
