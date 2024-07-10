import React from 'react';
import ReactDOM from 'react-dom';
import styles from './footer.module.css';
import Logo from '../components/logo';

export default class Footer extends React.Component {
    render() {
        // TODO 나중에 모바일 및 반응형 컴포넌트 제작하기
        return (
            <footer className={styles.FooterRoot}>
                <span className={styles.FooterCopyRight}>Copyright © 2024 주식회사 승효. All rights reserved.</span>
                <Logo marginLeft={'auto'} />
            </footer>
        );
    }
}