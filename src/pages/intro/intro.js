import React, { useState, useEffect, useRef } from 'react';
import styles from './intro.module.css';
import IntroTitleImg from '../../assets/introtitle.png';
import { Mobile, PC } from '../../responsive';

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
		<div ref={elementRef} className={styles.IntroStatisticsBlock}>
			<p className={styles.IntroStatisticsBlockMainText}>{Math.floor(count)}</p>
			<p className={styles.IntroStatisticsBlockSubText}>{subTitle}</p>
		</div>
	);
};
function Statistics() {
	return (
		<>
			<Mobile>
				<div
					className={styles.IntroStatistics}
					style={{ paddingBottom: '0px' }}
				>
					<StatisticsBlock mainNumber={30000} subTitle={'전체 문제'} />
					<StatisticsBlock mainNumber={20000} subTitle={'채점 가능한 문제'} />
				</div>
				<div className={styles.IntroStatistics}>
					<StatisticsBlock mainNumber={1000} subTitle={'풀린 문제'} />
					<StatisticsBlock mainNumber={2000} subTitle={'채점 가능 언어'} />
				</div>
			</Mobile>
			<PC>
				<div className={styles.IntroStatistics}>
					<StatisticsBlock mainNumber={30000} subTitle={'전체 문제'} />
					<StatisticsBlock mainNumber={20000} subTitle={'채점 가능한 문제'} />
					<StatisticsBlock mainNumber={1000} subTitle={'풀린 문제'} />
					<StatisticsBlock mainNumber={2000} subTitle={'채점 가능 언어'} />
				</div>
			</PC>
		</>
	);
}

function Ad() {
	return <img className={styles.IntroAd} src={IntroTitleImg}></img>;
}

export default function Intro() {
	return (
		<main>
			<Ad />
			<p className={styles.IntroTitle}>쉽다! 재미있다! 빠르다!</p>
			<Statistics />
		</main>
	);
}
