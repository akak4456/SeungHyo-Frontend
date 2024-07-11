import React from 'react';
import ReactDOM from 'react-dom';
import styles from './join.module.css';
import Header from '../../header/header';
import { NavLink } from 'react-router-dom';
import InputBox from '../../components/inputbox';
import { Mobile, PC } from '../../responsive';
import NormalButton from '../../components/button-normal';
function JoinFormInner() {
	return (
		<>
			<div className={styles.JoinFormInner}>
				<p className={styles.JoinMainTitle}>회원가입</p>
				<p className={styles.JoinSubTitle}>
					계정이 이미 있는 경우 <NavLink to={'/login'}>로그인</NavLink>을
					해주세요.
				</p>
				<p className={styles.JoinSubTitle}>
					가입을 하면 승효 온라인 저지의{' '}
					<NavLink to={'/agree'}>
						이용약관, 개인정보취급방침 및 개인정보 3자제공
					</NavLink>
					에 동의하게 됩니다.
				</p>
				<p className={styles.JoinSubTitle}>
					가입 후 아이디는 변경할 수 없습니다.
				</p>
				<div className={styles.JoinDiv}></div>
				<p className={styles.JoinInputTitle}>아이디</p>
				<InputBox type="text"></InputBox>
				<p className={styles.JoinInputTitle}>
					상태 메시지 (다른 사람에게 보이고 싶은 한마디)
				</p>
				<InputBox type="text"></InputBox>
				<p className={styles.JoinInputTitle}>비밀번호</p>
				<InputBox type="password"></InputBox>
				<p className={styles.JoinInputTitle}>비밀번호 확인</p>
				<InputBox type="password"></InputBox>
				<p className={styles.JoinInputTitle}>이메일</p>
				<div className={styles.JoinEmail}>
					<InputBox type="text"></InputBox>
					<NormalButton type="primary" text="인증번호 전송"></NormalButton>
				</div>
				<p className={styles.JoinInputTitle}>이메일 확인</p>
				<div className={styles.JoinEmail}>
					<InputBox type="text"></InputBox>
					<NormalButton type="primary" text="인증번호 확인"></NormalButton>
				</div>
				<div className={styles.JoinBtn}>
					<NormalButton type="primary" text="회원가입"></NormalButton>
				</div>
			</div>
		</>
	);
}
export default function Join() {
	return (
		<>
			<Header />
			<main>
				<p className={styles.JoinTitle}>회원가입</p>
				<PC>
					<div className={styles.JoinFormRoot}>
						<JoinFormInner></JoinFormInner>
					</div>
				</PC>
				<Mobile>
					<div className={styles.JoinFormRootMobile}>
						<JoinFormInner></JoinFormInner>
					</div>
				</Mobile>
			</main>
		</>
	);
}
