import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import IntroTitleImg from '../assets/introtitle.png';
import { NavLink } from 'react-router-dom';
import { useIsMobile, useIsTablet } from '../hooks/media-query';
import Slider from 'react-slick';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { ChatLeftFill } from 'react-bootstrap-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const IntroStickerRootDiv = styled.div`
	padding-left: 16px;
	box-sizing: border-box;
`;
const IntroStickerTitleDiv = styled.div`
	margin-top: 16px;
	box-sizing: border-box;
	& span {
		display: inline-block;
		padding-bottom: 8px;
		border-bottom: 2px solid var(--color-primary);
		font-size: 22px;
		color: var(--color-normal-text-color);
	}
`;
const IntroStickerDivider = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--color-white-gray);
	margin-bottom: 16px;
`;
const IntroSticker = ({ title, children }) => {
	return (
		<IntroStickerRootDiv>
			<IntroStickerTitleDiv>
				<span>{title}</span>
			</IntroStickerTitleDiv>
			<IntroStickerDivider></IntroStickerDivider>
			{children}
		</IntroStickerRootDiv>
	);
};
const StyledIntroStatisticsDiv = styled.div`
	background-color: black;
	padding-top: 16px;
	padding-bottom: 16px;
	padding-left: 12.5%;
	padding-right: 12.5%;
	display: flex;
	${({ $isPaddingBottomZero }) =>
		$isPaddingBottomZero &&
		css`
			padding-bottom: 0;
		`}
`;
const StyledIntroStatisticsBlockDiv = styled.div`
	border: 1px solid var(--color-silver);
	flex: 1 1 0;
	padding-top: 24px;
	padding-bottom: 24px;
	margin-right: ${({ $isMarginRightZero }) =>
		$isMarginRightZero ? '0' : '16px'};
	text-align: center;
	& p:first-child {
		color: white;
		font-weight: bold;
		font-size: max(24px, 2vw);
	}
	& p:last-child {
		color: var(--color-silver);
		font-size: max(12px, 1vw);
		margin-top: 16px;
	}
`;
const StyledAdDiv = styled.div`
	margin-left: 12.5%;
	margin-right: 12.5%;
	width: 75%;
	text-align: center;
	margin-bottom: 96px;
	& div {
		position: relative;
	}
	& img {
		width: 100%;
	}
	& p {
		position: absolute;
		text-align: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 3vw;
	}
`;
const StatisticsBlock = ({ mainNumber, subTitle, isMarginRightZero }) => {
	const [count, setCount] = useState(0);
	const endValue = mainNumber;
	const duration = 1000; // 애니메이션 시간 (밀리초)
	const incrementTime = 10; // 숫자 증가 주기 (밀리초)
	const incrementValue = endValue / (duration / incrementTime);
	const intervalRef = useRef(null);
	const elementRef = useRef(null);
	const observerRef = useRef(null);

	useEffect(() => {
		const observerCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (!intervalRef.current) {
						intervalRef.current = setInterval(() => {
							setCount((prevCount) => {
								if (prevCount + incrementValue >= endValue) {
									clearInterval(intervalRef.current);
									intervalRef.current = null;
									return endValue;
								}
								return prevCount + incrementValue;
							});
						}, incrementTime);
					}
				} else {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
				}
			});
		};

		observerRef.current = new IntersectionObserver(observerCallback, {
			threshold: 0.1, // 요소의 10%가 뷰포트에 보일 때 콜백 실행
		});

		if (elementRef.current) {
			observerRef.current.observe(elementRef.current);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			if (observerRef.current && elementRef.current) {
				observerRef.current.unobserve(elementRef.current);
			}
		};
	}, [incrementValue, incrementTime, endValue]);

	return (
		<StyledIntroStatisticsBlockDiv
			ref={elementRef}
			$isMarginRightZero={isMarginRightZero}
		>
			<p>{Math.floor(count)}</p>
			<p>{subTitle}</p>
		</StyledIntroStatisticsBlockDiv>
	);
};
const Statistics = () => {
	const isTablet = useIsTablet();
	return (
		<>
			{isTablet && (
				<>
					<StyledIntroStatisticsDiv $isPaddingBottomZero={true}>
						<StatisticsBlock mainNumber={30000} subTitle={'전체 문제'} />
						<StatisticsBlock
							mainNumber={20000}
							subTitle={'채점 가능한 문제'}
							isMarginRightZero={true}
						/>
					</StyledIntroStatisticsDiv>
					<StyledIntroStatisticsDiv>
						<StatisticsBlock mainNumber={1000} subTitle={'풀린 문제'} />
						<StatisticsBlock
							mainNumber={2000}
							subTitle={'채점 가능 언어'}
							isMarginRightZero={true}
						/>
					</StyledIntroStatisticsDiv>
				</>
			)}
			{!isTablet && (
				<StyledIntroStatisticsDiv>
					<StatisticsBlock mainNumber={30000} subTitle={'전체 문제'} />
					<StatisticsBlock mainNumber={20000} subTitle={'채점 가능한 문제'} />
					<StatisticsBlock mainNumber={1000} subTitle={'풀린 문제'} />
					<StatisticsBlock mainNumber={2000} subTitle={'채점 가능 언어'} />
				</StyledIntroStatisticsDiv>
			)}
		</>
	);
};
const Ad = () => {
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const sliderRef = useRef(null);
	useEffect(() => {
		let timer = null;
		const startTimer = () => {
			timer = setTimeout(() => {
				sliderRef.current.slickNext();
				startTimer();
			}, 3000);
		};
		startTimer();
		return () => {
			clearTimeout(timer);
		};
	}, []);
	return (
		<StyledAdDiv>
			<Slider {...settings} ref={sliderRef}>
				<div>
					<img src={IntroTitleImg} />
					<p>승효 알고리즘은 쉽다</p>
				</div>
				<div>
					<img src={IntroTitleImg} />
					<p>승효 알고리즘은 재밌다</p>
				</div>
				<div>
					<img src={IntroTitleImg} />
					<p>승효 알고리즘은 빠르다</p>
				</div>
			</Slider>
		</StyledAdDiv>
	);
};

const IntroStickerWrapperDiv = styled.div`
	margin-top: 96px;
	width: 75%;
	margin-left: 12.5%;
	margin-right: 12.5%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	& > div {
		flex-basic: ${({ $responsiveType }) =>
			$responsiveType == 'M' ? '100%' : $responsiveType == 'T' ? '50%' : '25%'};
		width: ${({ $responsiveType }) =>
			$responsiveType == 'M' ? '100%' : $responsiveType == 'T' ? '50%' : '25%'};
	}
`;
const IntroStickerItemWrapperRootDiv = styled.div`
	background: linear-gradient(-45deg, transparent 10px, var(--color-example) 0);
	position: relative;
	cursor: pointer;
	margin-top: 8px;
`;
const IntroStickerItemEdgeDiv = styled.div`
	width: 14px;
	height: 14px;
	display: inline-block;
	position: absolute;
	background: linear-gradient(
		-45deg,
		transparent 10px,
		${({ $isHovering }) =>
				$isHovering
					? 'var(--color-primary)'
					: 'var(--color-intro-sticker-edge)'}
			0
	);
	top: 100%;
	left: 100%;
	transform: translate(-100%, -100%);
	transition: 0.5s;
`;
const IntroStickerItemWrapper = ({ children }) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};
	return (
		<IntroStickerItemWrapperRootDiv
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<div style={{ padding: '16px 8px' }}>{children}</div>
			<IntroStickerItemEdgeDiv
				$isHovering={isHovering}
			></IntroStickerItemEdgeDiv>
		</IntroStickerItemWrapperRootDiv>
	);
};

const IntroStickerBoardTitle = styled.p`
	font-size: 13px;
	& a {
		text-decoration: none;
	}
	& a:hover {
		text-decoration: underline;
	}
	& a:first-child {
		color: var(--color-primary);
	}
	& a:last-child {
		color: var(--color-normal-text-color);
	}
`;
const IntroStickerProblemTitle = styled.p`
	font-size: 13px;
	& a {
		text-decoration: none;
		color: var(--color-normal-text-color);
	}
	& a:hover {
		text-decoration: underline;
	}
`;
const IntroStickerBoardBottm = styled.div`
	& span {
		margin-left: 4px;
	}
	& span:first-child {
		margin-left: 0;
	}
`;
const IntroStickerBoardBottomSpan = styled.span`
	font-size: 11px;
	color: var(--color-gray);
`;

export default function Intro() {
	const isMobile = useIsMobile();
	const isTablet = useIsTablet();
	const responsiveType = isMobile ? 'M' : isTablet ? 'T' : 'P';
	return (
		<main>
			<Ad />
			<Statistics />
			<IntroStickerWrapperDiv $responsiveType={responsiveType}>
				<IntroSticker title={'새로운 글'}>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 도대체 어떻게 하는건가요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 도대체 어떻게 하는건가요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 도대체 어떻게 하는건가요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 도대체 어떻게 하는건가요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 도대체 어떻게 하는건가요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
				</IntroSticker>
				<IntroSticker title={'인기 글'}>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 왜 인기가 있나요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 왜 인기가 있나요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">이건 왜 인기가 있나요?</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">
								이건 왜 인기가 있나요?이건 왜 인기가 있나요?이건 왜 인기가
								있나요?이건 왜 인기가 있나요?이건 왜 인기가 있나요?이건 왜
								인기가 있나요?이건 왜 인기가 있나요?
							</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
				</IntroSticker>
				<IntroSticker title={'공지사항'}>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerBoardTitle>
							<NavLink to="#">@akak4456</NavLink>{' '}
							<NavLink to="#">공지사항입니다.</NavLink>
						</IntroStickerBoardTitle>
						<IntroStickerBoardBottm>
							<IntroStickerBoardBottomSpan>55분전</IntroStickerBoardBottomSpan>
							<span>
								<HandThumbsUp size={'11px'}></HandThumbsUp>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
							<span>
								<ChatLeftFill size={'11px'}></ChatLeftFill>
							</span>
							<IntroStickerBoardBottomSpan>0</IntroStickerBoardBottomSpan>
						</IntroStickerBoardBottm>
					</IntroStickerItemWrapper>
				</IntroSticker>
				<IntroSticker title={'문제 순위'}>
					<IntroStickerItemWrapper>
						<IntroStickerProblemTitle>
							<NavLink to="#">1000번. A + B</NavLink>
						</IntroStickerProblemTitle>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerProblemTitle>
							<NavLink to="#">1000번. A + B</NavLink>
						</IntroStickerProblemTitle>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerProblemTitle>
							<NavLink to="#">1000번. A + B</NavLink>
						</IntroStickerProblemTitle>
					</IntroStickerItemWrapper>
					<IntroStickerItemWrapper>
						<IntroStickerProblemTitle>
							<NavLink to="#">1000번. A + B</NavLink>
						</IntroStickerProblemTitle>
					</IntroStickerItemWrapper>
				</IntroSticker>
			</IntroStickerWrapperDiv>
		</main>
	);
}
