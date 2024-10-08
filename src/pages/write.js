import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputBox from '../components/inputbox';
import Dropdown from '../components/dropdown';
import NormalEditor from '../components/editor-normal';
import SourceEditor from '../components/editor-source';
import NormalButton from '../components/button-normal';
import { getBoardCategory, addBoard } from '../api/Board';
import { getAllProgramLanguage } from '../api/Submit';
import { useNavigate } from 'react-router-dom';
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
	const [data, setData] = useState();
	const [form, setForm] = useState({
		boardTitle: '',
		categoryName: '',
		categoryCode: '',
		langCode: '',
		langName: '',
		problemNo: '',
		normalHTMLContent: '',
		sourceCode: '',
	});
	useEffect(() => {
		getBoardCategory(
			(response) => {
				const data = response.data.data;
				setData((state) => ({
					...state,
					categories: data,
				}));
				const category = data.boardCategory[0];
				setForm((state) => ({
					...state,
					categoryCode: category.categoryCode,
					categoryName: category.categoryName,
				}));
			},
			(exception) => {}
		);
		getAllProgramLanguage(
			(response) => {
				const data = response.data.data;
				setData((state) => ({
					...state,
					language: data,
				}));
				const lang = data.languageList[0];
				setForm((state) => ({
					...state,
					langCode: lang.langCode,
					langName: lang.langName,
				}));
			},
			(exception) => {}
		);
	}, []);
	const normalEditorHTMLChange = (htmlContent) => {
		setForm((state) => ({
			...state,
			normalHTMLContent: htmlContent,
		}));
	};
	const sourceCodeEditorChange = (text) => {
		setForm((state) => ({
			...state,
			sourceCode: text,
		}));
	};
	const [warning, setWarning] = useState({
		title: '',
		problemNo: '',
		normal: '',
		sourceCode: '',
	});
	const navigate = useNavigate();
	const onWriteClick = () => {
		addBoard(
			form,
			(response) => {
				alert('게시글 등록을 하였습니다.');
				navigate('/board');
			},
			(exception) => {
				console.log(exception);
				const errors = exception?.response?.data?.data?.errors;
				const errorCode = exception?.response?.data?.data?.code;
				let titleWarningMessage = '';
				if (errors?.find((error) => error.field === 'boardTitle')) {
					titleWarningMessage = '제목을 입력해주세요';
				}
				setWarning((state) => ({
					...state,
					title: titleWarningMessage,
				}));
				let problemNoWarningMessage = '';
				if (errors?.find((error) => error.field === 'problemNo')) {
					problemNoWarningMessage = '유효한 문제번호를 입력해주세요';
				} else if (errorCode === 'B001') {
					problemNoWarningMessage = '존재하는 문제 번호만 입력해주세요';
				}
				setWarning((state) => ({
					...state,
					problemNo: problemNoWarningMessage,
				}));
				let normalHTMLContentErrorWarningMessage = '';
				if (errors?.find((error) => error.field === 'normalHTMLContent')) {
					normalHTMLContentErrorWarningMessage = '내용을 입력해주세요';
				}
				setWarning((state) => ({
					...state,
					normal: normalHTMLContentErrorWarningMessage,
				}));
				let sourceCodeWarningMessage = '';
				setWarning((state) => ({
					...state,
					sourceCode: sourceCodeWarningMessage,
				}));
			}
		);
	};
	return (
		<WriteRootMain>
			<WriteTable>
				<tr>
					<WriteTableLeftTd>제목</WriteTableLeftTd>
					<WriteTableRightTd>
						<InputBox
							onChange={(input) => {
								setForm((state) => ({
									...state,
									boardTitle: input,
								}));
							}}
							warning={warning.title}
						/>
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>카테고리</WriteTableLeftTd>
					<WriteTableRightTd>
						{data && data.categories && (
							<Dropdown
								dropDownText={data.categories.boardCategory.map(
									(category) => category.categoryName
								)}
								curText={form.categoryName}
								onDropDownTextChange={(text) => {
									const newCategoryCode = data.categories.boardCategory.find(
										(category) => category.categoryName == text
									).categoryCode;
									if (form.categoryCode != newCategoryCode) {
										setForm((state) => ({
											...state,
											categoryName: text,
											categoryCode: newCategoryCode,
										}));
									}
								}}
							/>
						)}
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>언어</WriteTableLeftTd>
					<WriteTableRightTd>
						{data && data.language && (
							<Dropdown
								dropDownText={data.language.languageList.map(
									(lang) => lang.langName
								)}
								curText={form.langName}
								onDropDownTextChange={(text) => {
									const newLangCode = data.language.languageList.find(
										(lang) => lang.langName == text
									).langCode;
									if (form.langCode != newLangCode) {
										setForm((state) => ({
											...state,
											langName: text,
											langCode: newLangCode,
										}));
									}
								}}
							/>
						)}
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>문제번호</WriteTableLeftTd>
					<WriteTableRightTd>
						<InputBox
							onChange={(input) => {
								setForm((state) => ({
									...state,
									problemNo: input,
								}));
							}}
							warning={warning.problemNo}
						/>
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>내용</WriteTableLeftTd>
					<WriteTableRightTd>
						<NormalEditor
							onHTMLChange={normalEditorHTMLChange}
							warningMessage={warning.normal}
						/>
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd>소스코드</WriteTableLeftTd>
					<WriteTableRightTd>
						<SourceEditor
							onChange={sourceCodeEditorChange}
							warningMessage={warning.sourceCode}
						/>
					</WriteTableRightTd>
				</tr>
				<tr>
					<WriteTableLeftTd></WriteTableLeftTd>
					<WriteTableRightTd>
						<NormalButton
							type="primary"
							text="글쓰기"
							onClick={onWriteClick}
						></NormalButton>
					</WriteTableRightTd>
				</tr>
			</WriteTable>
		</WriteRootMain>
	);
};

export default Write;
