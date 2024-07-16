import React from 'react';
import styles from './pw-find.module.css';
import InputBox from '../../components/inputbox';
import { Mobile, PC } from '../../responsive';
import NormalButton from '../../components/button-normal';
function PwFindInner() {
	const onPwFindClick = () => {
		// TODO 이메일을 보내도록 해라
	};
	return (
		<>
			<p className={styles.PwFindInputTitle}>아이디</p>
			<InputBox type="text"></InputBox>
			<div className={styles.PwFindButton}>
				<NormalButton
					type="primary"
					text="비밀번호 찾기"
					onClick={onPwFindClick}
				></NormalButton>
			</div>
		</>
	);
}

export default function PwFind() {
	return (
		<main>
			<p className={styles.PwFindTitle}>비밀번호 찾기</p>
			<PC>
				<div className={styles.PwFindRoot}>
					<PwFindInner></PwFindInner>
				</div>
			</PC>
			<Mobile>
				<div className={styles.PwFindRootMobile}>
					<PwFindInner></PwFindInner>
				</div>
			</Mobile>
		</main>
	);
}
