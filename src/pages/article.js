import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { HandThumbsUp } from 'react-bootstrap-icons';
import NormalEditor from '../components/editor-normal';
import SourceEditor from '../components/editor-source';
import Dropdown from '../components/dropdown';
import NormalButton from '../components/button-normal';
import { getBoardOne } from '../api/Board';
import { timeAgo } from '../util';
const ReplyAddRootDiv = styled.div`
	display: flex;
	width: 100%;
	margin-top: 24px;
	& button {
		font-size: 40px;
		margin-left: auto;
		margin-right: auto;
		padding: 16px;
	}
`;
const ReplyAddEditorDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;
const ReplyAdd = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSourceEditorOpen, setIsSourceEditorOpen] = useState(false);
	const languages = ['JAVA', 'C', 'C++'];
	return (
		<ReplyAddRootDiv>
			{!isOpen && (
				<NormalButton
					type="primary"
					text="댓글 쓰기"
					onClick={() => setIsOpen(true)}
				/>
			)}
			<ReplyAddEditorDiv>
				{isOpen && <NormalEditor />}
				{isOpen && !isSourceEditorOpen && (
					<NormalButton
						type="primary"
						text="소스 추가"
						onClick={() => setIsSourceEditorOpen(true)}
					/>
				)}
				{isOpen && isSourceEditorOpen && <Dropdown dropDownText={languages} />}
				{isOpen && isSourceEditorOpen && <SourceEditor></SourceEditor>}
				{isOpen && <NormalButton type="primary" text="댓글 저장" />}
			</ReplyAddEditorDiv>
		</ReplyAddRootDiv>
	);
};

const ReplyRootDiv = styled.div`
	border: 1px solid var(--color-white-gray);
	margin-top: 24px;
`;
const ReplyTitleDiv = styled.div`
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
	border-bottom: 1px solid var(--color-white-gray);
	background-color: var(--color-block-title-background);
	display: flex;
	flex-direction: row;
`;
const ReplyLike = styled.span`
	color: var(--color-primary);
	margin-left: auto;
	cursor: pointer;
`;
const ReplyContentRootDiv = styled.div`
	min-height: 100px;
	& p {
		padding: 16px;
		font-size: 18px;
		color: var(--color-normal-text-color);
	}
`;
const Reply = (props) => {
	return (
		<ReplyRootDiv>
			<ReplyTitleDiv>
				<span>{props.author}</span>
				<span style={{ marginLeft: '16px' }}>{props.date}</span>
				<HandThumbsUp
					style={{ marginLeft: '16px' }}
					size={'16px'}
				></HandThumbsUp>
				<span style={{ marginLeft: '8px' }}>{props.recommendCount}</span>
				<ReplyLike>좋아요</ReplyLike>
			</ReplyTitleDiv>
			<ReplyContentRootDiv>
				<p>{props.content}</p>
			</ReplyContentRootDiv>
		</ReplyRootDiv>
	);
};
const ArticleRootMain = styled.main`
	width: 75%;
	margin-left: 12.5%;
	margin-top: 48px;
`;
const ArticleTitleDiv = styled.div`
	color: var(--color-normal-text-color);
	font-size: 28px;
`;
const ArticleLinkRootDiv = styled.div`
	margin-top: 24px;
	& a {
		text-decoration: none;
		color: var(--color-primary);
		font-size: 28px;
	}
`;
const Article = (props) => {
	const location = useLocation();
	// 경로를 '/'로 분할
	const parts = location.pathname.split('/');

	// 숫자 ID는 세 번째 부분에 위치
	const boardNo = parts[2];
	const [boardData, setBoardData] = useState();
	useEffect(() => {
		getBoardOne(boardNo, (data) => {
			console.log(data);
			setBoardData(data);
		});
	}, []);
	return (
		<ArticleRootMain>
			{boardData && (
				<>
					<ArticleTitleDiv>
						<p>{boardData.boardTitle}</p>
					</ArticleTitleDiv>
					<ArticleLinkRootDiv>
						<NavLink to={`/problem/${boardData.problemNo}`}>
							{boardData.problemNo}번 - {boardData.problemTitle}
						</NavLink>
					</ArticleLinkRootDiv>
					<Reply
						author={boardData.boardMemberId}
						date={timeAgo(boardData.boardRegDate)}
						recommendCount={boardData.boardLikeCount}
						content={boardData.boardContent}
					/>
				</>
			)}

			<Reply
				author={'akak4478'}
				date={'10분전'}
				recommendCount={'10'}
				content={'이건 댓글이에요 그리고 댓글은 페이징 처리가 되지요'}
			/>
			<ReplyAdd />
		</ArticleRootMain>
	);
};
export default Article;
