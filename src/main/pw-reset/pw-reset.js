import React from 'react';
import styles from './pw-reset.module.css';
import Header from '../../header/header';
import InputBox from '../../common/input-box/input-box';
import { Mobile, PC } from '../../responsive';
import NormalButton from '../../components/button-normal';
function PwResetInner() {
	const onPwChangeClick = () => {};
	return (
		<>
			<p className={styles.PwResetInputTitle}>새로운 비밀번호</p>
			<InputBox type="password"></InputBox>
			<p className={styles.PwResetInputTitle}>새로운 비밀번호 확인</p>
			<InputBox type="password"></InputBox>
			<div className={styles.PwResetButton}>
				<NormalButton
					type="primary"
					text="비밀번호 변경"
					onClick={onPwChangeClick}
				></NormalButton>
			</div>
		</>
	);
}

export default function PwReset() {
	return (
		<>
			<Header />
			<main>
				<p className={styles.PwResetTitle}>비밀번호 초기화</p>
				<PC>
					<div className={styles.PwResetRoot}>
						<PwResetInner></PwResetInner>
					</div>
				</PC>
				<Mobile>
					<div className={styles.PwResetRootMobile}>
						<PwResetInner></PwResetInner>
					</div>
				</Mobile>
			</main>
		</>
	);
}
