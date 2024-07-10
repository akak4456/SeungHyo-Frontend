import React from 'react';
import styles from './login.module.css';
import Header from '../../header/header';
import { NavLink } from 'react-router-dom';
import InputBox from '../../common/input-box/input-box';
import { Mobile, PC } from '../../responsive';
import { PersonFill, LockFill } from 'react-bootstrap-icons';
import CheckBox from '../../common/check-box/check-box';
import NormalButton from '../../components/button-normal';
function LoginFormInner() {
	return (
		<>
			<div className={styles.LoginFormInner}>
				<p className={styles.LoginMainTitle}>로그인</p>
				<div className={styles.LoginDiv}></div>
				<div className={styles.LoginForm}>
					<div>
						<PersonFill size="16" />
					</div>
					<InputBox type="text" placeholder="아이디 / 이메일"></InputBox>
				</div>
				<div className={styles.LoginForm}>
					<div>
						<LockFill size="16" />
					</div>
					<InputBox type="password" placeholder="비밀번호"></InputBox>
				</div>
				<div className={styles.LoginAction}>
					<CheckBox id="checkbox" text="로그인 상태 유지" />
					<NormalButton type="primary" text="로그인"></NormalButton>
				</div>
				<div className={styles.LoginDiv}></div>
				<p className={styles.LoginSubTitle}>
					비밀번호를 잊었을 경우 <NavLink to={'/pw-find'}>여기</NavLink>를
					눌러주세요.
				</p>
				<p className={styles.LoginSubTitle}>
					회원가입은 <NavLink to={'/join'}>여기</NavLink>에서 할 수 있습니다.
				</p>
			</div>
		</>
	);
}
export default function Login() {
	return (
		<>
			<Header />
			<main>
				<p className={styles.LoginTitle}>로그인</p>
				<PC>
					<div className={styles.LoginFormRoot}>
						<LoginFormInner></LoginFormInner>
					</div>
				</PC>
				<Mobile>
					<div className={styles.LoginFormRootMobile}>
						<LoginFormInner></LoginFormInner>
					</div>
				</Mobile>
			</main>
		</>
	);
}
