import React from 'react';
import ReactDOM from 'react-dom';
import styles from './setting-info-edit.module.css';
import Header from '../../../header/header';
import SettingTab from '../setting-tab';
import {useMediaQuery} from 'react-responsive';
import { isMobileQuery } from '../../../responsive';
import classNames from 'classnames';
import InputBox from '../../../common/input-box/input-box';
import PrimaryButton from '../../../common/button/primary/primary-button';

const SettingInfoEdit = () => {
    const isMobile = useMediaQuery({
        query : isMobileQuery
    });
    return (
        <>
            <Header></Header>
            <main className={classNames(styles.SettingInfoEditRoot, {[styles.SettingInfoEditRootMobile]: isMobile})}>
                <SettingTab isInfoEditActive={true}></SettingTab>
                <div className={classNames(styles.SettingInfoEditContent, {[styles.SettingInfoEditContentMobile]: isMobile})}>
                    <p className={styles.SettingInfoEditMainTitle}>정보 수정</p>
                    <div className={styles.SettingInfoEditDiv}></div>
                    <p className={styles.SettingInfoInputTitle}>아이디</p>
                    <InputBox type="text" disabled value="akak4456"></InputBox>
                    <p className={styles.SettingInfoInputTitle}>상태 메시지</p>
                    <InputBox type="text" value="컴공 17 조승효"></InputBox>
                    <p className={styles.SettingInfoInputTitle}>비밀번호</p>
                    <InputBox type="password" placeholder="비밀번호"></InputBox>
                    <p className={styles.SettingInfoInputTitle}>이메일</p>
                    <InputBox type="text" disabled value="akak4456@naver.com"></InputBox>
                    <div className={styles.SettingInfoEditButtonGroup}>
                        <PrimaryButton buttonText="수정"></PrimaryButton>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SettingInfoEdit;