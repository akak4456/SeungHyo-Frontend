import React from 'react';
import ReactDOM from 'react-dom';
import styles from './setting-tab.module.css';
import { Mobile, PC } from '../../responsive';
import classNames from 'classnames';
const SettingTabBlock = props => {
    return (
        <p className={classNames(styles.SettingTabBlock, {[styles.SettingTabBlockActive] : props.isActive})}>{props.text}</p>
    )
}
const SettingInner = props => {
    return (
        <>
            <SettingTabBlock text={"정보 수정"} isActive={props.isInfoEditActive}></SettingTabBlock>
            <SettingTabBlock text={"비밀번호 변경"} isActive={props.isPWChangeActive}></SettingTabBlock>
            <SettingTabBlock text={"탈퇴하기"} isActive={props.isWithdrawActive}></SettingTabBlock>
        </>
    )
}
const SettingTab = props => {
    return (
        <>
        <PC>
            <div className={styles.SettingTabPC}>
                <SettingInner {...props}></SettingInner>
            </div>
        </PC>
        <Mobile>
            <div className={styles.SettingTabMobile}>
                <SettingInner {...props}></SettingInner>
            </div>
        </Mobile>
        </>
    )
}
export default SettingTab;