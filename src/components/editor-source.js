import React from 'react';
import AceEditor from 'react-ace';
import styled, { css } from 'styled-components';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
const AceEditorWrapper = styled.div`
	#sourceEditor {
		${({ $isWarning }) =>
			$isWarning
				? css`
						border: 1px solid var(--color-danger) !important;
					`
				: css`
						border: 1px solid #f1f1f1 !important;
					`}
	}
`;
const StyledWarning = styled.span`
	color: var(--color-danger);
	font-size: 11px;
	margin-top: 8px;
`;
const SourceEditor = ({
	onChange,
	width,
	warningMessage,
	readOnly,
	defaultValue,
}) => {
	console.log('defaultValue', defaultValue);
	return (
		<AceEditorWrapper $isWarning={warningMessage}>
			<AceEditor
				mode="java"
				theme="github"
				onChange={onChange}
				name="sourceEditor"
				editorProps={{
					$blockScrolling: true,
				}}
				readOnly={readOnly}
				defaultValue={defaultValue}
				width={width ? width : '100%'}
			/>
			{warningMessage && <StyledWarning>{warningMessage}</StyledWarning>}
		</AceEditorWrapper>
	);
};
export default SourceEditor;
