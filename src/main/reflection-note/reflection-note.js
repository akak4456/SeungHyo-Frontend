import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './reflection-note.module.css';
import Header from '../../header/header';
import classNames from 'classnames';
import { CaretDownFill } from 'react-bootstrap-icons';
import { CSSTransition } from 'react-transition-group';
const ReflectionExampleTab = (props) => {
	const copyFn = async (event) => {
		event.preventDefault();
		var preText = props.copyText;

		try {
			// Clipboard API를 사용하여 텍스트를 클립보드에 복사
			await navigator.clipboard.writeText(preText);
		} catch (err) {
			// 에러가 발생하면 사용자에게 알림
			console.error('Failed to copy: ', err);
			alert('Failed to copy text.');
		}
	};
	return (
		<div className={styles.ReflectionExampleTab}>
			<span>
				{props.text} {props.copyText && <a onClick={copyFn}>복사</a>}
			</span>
		</div>
	);
};
const ReflectionNoteCaseBlock = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const example1Text = '1 2';
	const example2Text = '3';
	return (
		<div className={styles.ReflectionNoteCaseBlockRoot}>
			<div
				className={styles.ReflectionNoteCaseBlockTitle}
				onClick={() => setIsOpen(!isOpen)}
			>
				<p>
					<span className={styles.ReflectionNoteCaseBlockNum}>
						CASE {props.caseNum}.
					</span>{' '}
					<span
						className={
							props.isCorrect
								? styles.ReflectionNoteCaseBlockCorrect
								: styles.ReflectionNoteCaseBlockWrong
						}
					>
						{props.caseTitle}
					</span>
				</p>
				<CaretDownFill
					className={classNames(styles.ReflectionNoteCaseBlockFill, {
						[styles.ReflectionNoteCaseBlockFillRotate]: isOpen,
					})}
				></CaretDownFill>
			</div>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames={{
					enter: styles.ReflectionNoteCaseBlockExampleEnter,
					enterActive: styles.ReflectionNoteCaseBlockExampleEnterActive,
					exit: styles.ReflectionNoteCaseBlockExampleExit,
					exitActive: styles.ReflectionNoteCaseBlockExampleExitActive,
				}}
				unmountOnExit
			>
				<div className={styles.ReflectionNoteCaseBlockExample}>
					<ReflectionExampleTab text={'입력'} copyText={example1Text} />
					<div className={styles.ReflectionNoteCaseBlockExampleDivider}></div>
					<pre className={styles.ReflectionNoteCaseBlockExamplePre}>
						{example1Text}
					</pre>
					<ReflectionExampleTab text={'출력 '} copyText={example2Text} />
					<div className={styles.ReflectionNoteCaseBlockExampleDivider}></div>
					<pre className={styles.ReflectionNoteCaseBlockExamplePre}>
						{example2Text}
					</pre>
				</div>
			</CSSTransition>
		</div>
	);
};
const ReflectionNote = (props) => {
	return (
		<>
			<Header />
			<main className={styles.ReflectionNoteRoot}>
				<p className={styles.ReflectionNoteTitle}>
					1000번. A + B<sub>(제출번호:1000)</sub>
				</p>
				<ReflectionNoteCaseBlock
					caseNum={1}
					caseTitle={'맞았습니다'}
					isCorrect={true}
				/>
				<ReflectionNoteCaseBlock
					caseNum={2}
					caseTitle={'맞았습니다'}
					isCorrect={true}
				/>
			</main>
		</>
	);
};
export default ReflectionNote;
