import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const SourceEditor = (props) => {
	return (
		<AceEditor
			mode="java"
			theme="github"
			onChange={props.onChange}
			name="sourceEditor"
			editorProps={{ $blockScrolling: true }}
			width={props.width ? props.width : '100%'}
		/>
	);
};
export default SourceEditor;
