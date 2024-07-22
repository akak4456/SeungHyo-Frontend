import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import IntroTitleImg from '../assets/introtitle.png';
import { useIsTablet } from '../hooks/media-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const StyledIntroStatisticsDiv = styled.div`
	background-color: black;
	padding-top: 16px;
	padding-bottom: 16px;
	padding-left: 12.5%;
	padding-right: 12.5%;
	display: flex;
	${(props) =>
		props.isPaddingBottomZero &&
		css`
			padding-bottom: 0;
		`}
`;
const StyledIntroStatisticsBlockDiv = styled.div`
	border: 1px solid var(--color-silver);
	flex: 1 1 0;
	padding-top: 24px;
	padding-bottom: 24px;
	margin-right: 16px;
	text-align: center;
	& p:first-child {
		color: white;
		font-weight: bold;
		font-size: 35px;
	}
	& p:last-child {
		color: var(--color-silver);
		font-size: 16px;
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
const StatisticsBlock = ({ mainNumber, subTitle }) => {
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
		<StyledIntroStatisticsBlockDiv ref={elementRef}>
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
					<StyledIntroStatisticsDiv isPaddingBottomZero={true}>
						<StatisticsBlock mainNumber={30000} subTitle={'전체 문제'} />
						<StatisticsBlock mainNumber={20000} subTitle={'채점 가능한 문제'} />
					</StyledIntroStatisticsDiv>
					<StyledIntroStatisticsDiv>
						<StatisticsBlock mainNumber={1000} subTitle={'풀린 문제'} />
						<StatisticsBlock mainNumber={2000} subTitle={'채점 가능 언어'} />
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

export default function Intro() {
	return (
		<main>
			<Ad />
			<Statistics />
		</main>
	);
}
