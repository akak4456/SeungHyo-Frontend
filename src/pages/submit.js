import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SourceEditor from '../components/editor-source';
import NormalButton from '../components/button-normal';
import RadioButton from '../components/button-radio';
import Dropdown from '../components/dropdown';
import { getProgramLanguageByProblem } from '../api/Submit';
import { useLocation, useNavigate } from 'react-router-dom';
import { newSubmit } from '../api/Submit';
const ProblemRightSideRootDiv = styled.div`
	width: 50%;
	margin-right: 24px;
	box-sizing: border-box;
	margin-top: 48px;
	${($isTablet) =>
		$isTablet &&
		css`
			width: 100%;
			margin-right: 0;
			margin-top: 24px;
		`};
`;

const ProblemRightSideTable = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 16px;
`;
const ProblemRightSideLeftTd = styled.td`
	white-space: nowrap;
	text-align: right;
	vertical-align: top;
	padding-top: 8px;
	color: var(--color-normal-text-color);
	font-size: 13px;
	font-weight: bold;
`;
const ProblemRightSideRightTd = styled.td`
	width: 100%;
	padding-left: 24px;
	& label {
		width: 100%;
		display: inline-block;
		margin-top: 16px;
	}
	& label:first-child {
		margin-top: 0px;
	}
	& label:last-child {
		padding-top: 8px;
	}
`;

const ProblemRightSide = ({ programLanguage, problemNo }) => {
	const firstLang =
		programLanguage.languageList && programLanguage.languageList[0];
	console.log(firstLang);
	const dropDownText = programLanguage.languageList
		? programLanguage.languageList.map((lang) => lang.langName)
		: [];
	const [formData, setFormData] = useState({
		problemNo: problemNo,
		langCode: firstLang ? firstLang.langCode : '',
		langName: firstLang ? firstLang.langName : '',
		sourceCodeDisclosureScope: '',
		sourceCode: '',
	});
	const onDropDownTextChange = (text) => {
		const newLangCode = programLanguage.languageList
			? programLanguage.languageList.find((lang) => lang.langName === text)
					.langCode
			: '';
		if (formData.langCode !== newLangCode) {
			setFormData((state) => ({
				...state,
				langCode: newLangCode,
				langName: text,
			}));
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((state) => ({
			...state,
			sourceCodeDisclosureScope: value,
		}));
	};
	const editorChange = (text) => {
		setFormData((state) => ({
			...state,
			sourceCode: text,
		}));
	};
	const navigate = useNavigate();
	const onSubmitClick = (e) => {
		e.preventDefault();
		if (formData.sourceCodeDisclosureScope === '') {
			alert('소스코드 공개범위를 지정해주세요');
			return;
		}
		if (formData.sourceCode === '') {
			alert('소스코드를 입력해주세요');
			return;
		}
		newSubmit(formData, (data) => {
			navigate('/reflection-note/' + data.submitNo);
		});
	};
	return (
		<ProblemRightSideRootDiv>
			<ProblemRightSideTable>
				<tr>
					<ProblemRightSideLeftTd>언어</ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						{dropDownText.length > 0 && (
							<Dropdown
								isSearchIncluded={true}
								curText={formData.langName}
								dropDownText={dropDownText}
								onDropDownTextChange={onDropDownTextChange}
							></Dropdown>
						)}
					</ProblemRightSideRightTd>
				</tr>
				<tr>
					<ProblemRightSideLeftTd>소스 코드 공개</ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<fieldset>
							<RadioButton text="공개" value="ALL" onChange={handleChange} />
							<RadioButton text="비공개" value="NONE" onChange={handleChange} />
							<RadioButton
								text="맞았을 때만 공개"
								value="WHEN_CORRECT"
								onChange={handleChange}
							/>
						</fieldset>
					</ProblemRightSideRightTd>
				</tr>
				<tr>
					<ProblemRightSideLeftTd>소스 코드</ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<SourceEditor onChange={editorChange} />
					</ProblemRightSideRightTd>
				</tr>
				<tr>
					<ProblemRightSideLeftTd></ProblemRightSideLeftTd>
					<ProblemRightSideRightTd>
						<NormalButton
							type="primary"
							text="제출하기"
							onClick={onSubmitClick}
						></NormalButton>
					</ProblemRightSideRightTd>
				</tr>
			</ProblemRightSideTable>
		</ProblemRightSideRootDiv>
	);
};

const SubmitRootMain = styled.main`
	width: 75%;
	margin: auto;
	display: flex;
	margin-top: 48px;
`;
/**
 * isNew: 추가모드인지, true 면 추가 false 면 편집
 */
const Submit = ({ isNew }) => {
	const [programLanguage, setProgramLanguage] = useState({});
	const location = useLocation();
	// 경로를 '/'로 분할
	const parts = location.pathname.split('/');

	// 숫자 ID는 세 번째 부분에 위치
	const no = parts[parts.length - 1];
	useEffect(() => {
		getProgramLanguageByProblem(no, (data) => {
			setProgramLanguage(data);
		});
	}, []);
	return (
		<SubmitRootMain>
			{programLanguage.languageList && (
				<ProblemRightSide
					programLanguage={programLanguage}
					problemNo={no}
				></ProblemRightSide>
			)}
		</SubmitRootMain>
	);
};

export default Submit;
