import React from 'react';
import ReactDOM from 'react-dom';
import styles from './pw-reset.module.css';
import Header from '../../header/header';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../common/input-box/input-box';
import PrimamryButton from '../../common/button/primary/primary-button';
import {Mobile, PC} from '../../responsive';
import {PersonFill, LockFill} from 'react-bootstrap-icons';
import CheckBox from '../../common/check-box/check-box';
import PrimaryButton from '../../common/button/primary/primary-button';
function PwResetInner() {
    const onPwChangeClick = () => {
    };
    return (
        <>
            <p className={styles.PwResetInputTitle}>새로운 비밀번호</p>
            <InputBox type="password"></InputBox>
            <p className={styles.PwResetInputTitle}>새로운 비밀번호 확인</p>
            <InputBox type="password"></InputBox>
            <div className={styles.PwResetButton}>
                <PrimaryButton buttonText={"비밀번호 변경"} onClick={onPwChangeClick}></PrimaryButton>
            </div>
        </>
    )
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
    )
}