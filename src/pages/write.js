import React, { useState } from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import Dropdown from '../components/dropdown';
import NormalEditor from '../components/editor-normal';
import SourceEditor from '../components/editor-source';
import NormalButton from '../components/button-normal';
const WriteRootMain = styled.main`
	width: 75%;
	margin-left: 12.5%;
	margin-top: 40px;
`;
const WriteTable = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 16px;
`;
const WriteTableLeftTd = styled.td`
	white-space: nowrap;
	text-align: right;
	vertical-align: top;
	padding-top: 8px;
	color: var(--color-normal-text-color);
	font-size: 13px;
	font-weight: bold;
`;
const WriteTableRightTd = styled.td`
	width: 100%;
	padding-left: 24px;
`;
const Write = () => {
	const categories = ['질문', '자유', '기타'];
	const languages = ['JAVA', 'C', 'C++'];
	return (
		<WriteRootMain>
			<WriteTable>
				<tr>
					<WriteTableLeftTd>제목</WriteTableLeftTd>
					<WriteTableRightTd>
						<InputBox />
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>카테고리</WriteTableLeftTd>
					<WriteTableRightTd>
						<Dropdown dropDownText={categories} />
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>언어</WriteTableLeftTd>
					<WriteTableRightTd>
						<Dropdown dropDownText={languages} />
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>문제번호</WriteTableLeftTd>
					<WriteTableRightTd>
						<InputBox />
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>내용</WriteTableLeftTd>
					<WriteTableRightTd>
						<NormalEditor />
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>소스코드</WriteTableLeftTd>
					<WriteTableRightTd>
						<SourceEditor />
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd></WriteTableLeftTd>
					<WriteTableRightTd>
						<NormalButton type="primary" text="글쓰기"></NormalButton>
					</WriteTableRightTd>
				</tr>
			</WriteTable>
		</WriteRootMain>
	);
};

export default Write;
