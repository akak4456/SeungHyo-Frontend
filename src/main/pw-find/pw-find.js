import React from 'react';
import ReactDOM from 'react-dom';
import styles from './pw-find.module.css';
import Header from '../../header/header';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../common/input-box/input-box';
import PrimamryButton from '../../common/button/primary/primary-button';
import {Mobile, PC} from '../../responsive';
import {PersonFill, LockFill} from 'react-bootstrap-icons';
import CheckBox from '../../common/check-box/check-box';
import PrimaryButton from '../../common/button/primary/primary-button';
function PwFindInner() {
    const onPwFindClick = () => {
        // TODO 이메일을 보내도록 해라
    };
    return (
        <>
            <p className={styles.PwFindInputTitle}>아이디</p>
            <InputBox type="text"></InputBox>
            <div className={styles.PwFindButton}>
                <PrimaryButton buttonText={"비밀번호 찾기"} onClick={onPwFindClick}></PrimaryButton>
            </div>
        </>
    )
}

export default function PwFind() {
    return (
        <>
            <Header />
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
        </>
    )
}