import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { HandThumbsUp } from 'react-bootstrap-icons';
import NormalEditor from '../components/editor-normal';
import SourceEditor from '../components/editor-source';
import Dropdown from '../components/dropdown';
import NormalButton from '../components/button-normal';
import { getBoardOne, getReplyList } from '../api/Board';
import { timeAgo } from '../util';
import Pagination from '../components/pagination';
import { addReply } from '../api/Board';
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
const ReplyAdd = ({ boardNo, reloadReply }) => {
	const [warning, setWarning] = useState({
		normal: '',
		sourceCode: '',
	});
	const [form, setForm] = useState({
		content: '',
		sourceContent: '',
	});
	const normalEditorHTMLChange = (htmlContent) => {
		setForm((state) => ({
			...state,
			content: htmlContent,
		}));
	};
	const sourceCodeEditorChange = (text) => {
		setForm((state) => ({
			...state,
			sourceContent: text,
		}));
	};
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
				{isOpen && (
					<NormalEditor
						onHTMLChange={normalEditorHTMLChange}
						warningMessage={warning.normal}
					/>
				)}
				{isOpen && !isSourceEditorOpen && (
					<NormalButton
						type="primary"
						text="소스 추가"
						onClick={() => setIsSourceEditorOpen(true)}
					/>
				)}
				{isOpen && isSourceEditorOpen && <Dropdown dropDownText={languages} />}
				{isOpen && isSourceEditorOpen && (
					<SourceEditor
						onChange={sourceCodeEditorChange}
						warningMessage={warning.sourceCode}
					></SourceEditor>
				)}
				{isOpen && (
					<NormalButton
						type="primary"
						text="댓글 저장"
						onClick={() => {
							addReply(
								boardNo,
								form,
								(response) => {
									alert('댓글을 등록하였습니다.');
									reloadReply();
									setIsOpen(false);
									setIsSourceEditorOpen(false);
								},
								(exception) => {
									console.log(exception);
									const errors = exception?.response?.data?.data?.errors;
									let normalHTMLContentErrorWarningMessage = '';
									if (errors?.find((error) => error.field === 'content')) {
										normalHTMLContentErrorWarningMessage =
											'내용을 입력해주세요';
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
						}}
					/>
				)}
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
const Reply = ({ replyNo, author, date, recommendCount, content }) => {
	return (
		<ReplyRootDiv>
			<ReplyTitleDiv>
				<span>{author}</span>
				<span style={{ marginLeft: '16px' }}>{date}</span>
				<HandThumbsUp
					style={{ marginLeft: '16px' }}
					size={'16px'}
				></HandThumbsUp>
				<span style={{ marginLeft: '8px' }}>{recommendCount}</span>
				<ReplyLike>좋아요</ReplyLike>
			</ReplyTitleDiv>
			<ReplyContentRootDiv>
				<p dangerouslySetInnerHTML={{ __html: content }}></p>
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

const PaginationRootDiv = styled.div`
	width: 100%;
	margin-top: 24px;
	display: flex;
	& div {
		margin: 0 auto;
	}
`;
const ReplyTitle = styled.p`
	margin-top: 16px;
	font-size: 25px;
	font-weight: bold;
	color: var(--color-normal-text-color);
`;
const Article = (props) => {
	const location = useLocation();
	// 경로를 '/'로 분할
	const parts = location.pathname.split('/');

	// 숫자 ID는 세 번째 부분에 위치
	const boardNo = parts[2];

	const reloadReply = () => {
		searchParams.set('page', 0);
		searchParams.set('size', 10);
		searchParams.set('version', version + 1);
		setSearchParams(searchParams);
	};

	const prevLink = () => {
		searchParams.set('page', startPage - 1 - 1);
		searchParams.set('size', 10);
		setSearchParams(searchParams);
	};
	const nextLink = () => {
		searchParams.set('page', endPage + 1 - 1);
		searchParams.set('size', 10);
		setSearchParams(searchParams);
	};
	const goToLink = (num) => {
		searchParams.set('page', num - 1);
		searchParams.set('size', 10);
		setSearchParams(searchParams);
	};
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page')) || 0;
	const size = parseInt(searchParams.get('size')) || 10;
	const version = parseInt(searchParams.get('version')) || 0;
	const [pageData, setPageData] = useState();
	const startPage = Math.floor(page / size) * size + 1;
	let endPage = startPage + size - 1;
	if (pageData && endPage > pageData.totalPages) {
		endPage = pageData.totalPages;
	}

	useEffect(() => {
		getBoardOne(
			boardNo,
			(response) => {
				setPageData((state) => ({
					...state,
					board: response.data.data,
				}));
			},
			(exception) => {}
		);
		getReplyList(
			boardNo,
			page,
			size,
			(response) => {
				setPageData((state) => ({
					...state,
					reply: response.data.data,
				}));
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			},
			(exception) => {}
		);
	}, [page, size, version]);

	return (
		<ArticleRootMain>
			{pageData && pageData.board && (
				<>
					<ArticleTitleDiv>
						<p>{pageData.board.boardTitle}</p>
					</ArticleTitleDiv>
					<ArticleLinkRootDiv>
						<NavLink to={`/problem/${pageData.board.problemNo}`}>
							{pageData.board.problemNo}번 - {pageData.board.problemTitle}
						</NavLink>
					</ArticleLinkRootDiv>
					<Reply
						author={pageData.board.boardMemberId}
						date={timeAgo(pageData.board.boardRegDate)}
						recommendCount={pageData.board.boardLikeCount}
						content={pageData.board.boardContent}
					/>
				</>
			)}
			<ReplyTitle>댓글</ReplyTitle>
			{pageData &&
				pageData.reply &&
				pageData.reply.content &&
				pageData.reply.content.map((reply) => (
					<Reply
						key={reply.replyNo + 'reply'}
						replyNo={reply.replyNo}
						author={reply.memberId}
						date={timeAgo(reply.regDate)}
						recommendCount={reply.likeCount}
						content={reply.replyContent}
					/>
				))}
			<PaginationRootDiv>
				<Pagination
					prevLink={prevLink}
					nextLink={nextLink}
					minVal={startPage}
					maxVal={endPage}
					goToLink={goToLink}
					isPrevInclude={startPage != 1}
					isNextInclude={pageData && endPage != pageData.totalPages}
					currentNum={page + 1}
				/>
			</PaginationRootDiv>
			<ReplyAdd boardNo={boardNo} reloadReply={reloadReply} />
		</ArticleRootMain>
	);
};
export default Article;
