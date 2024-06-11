import React from 'react';
import ReactDOM from 'react-dom';
import './header.css';
import {Mobile, PC} from '../responsive.js';
import imgLogo from '../img/logo.png';
import TapButton from '../button/tapbutton.js';
import iconSearch from '../img/icon-search.png';

class Logo extends React.Component {
    render() {
        return (
            <img src={imgLogo} className='header-logo'></img>
        )
    }
}

class UserAnchor extends React.Component {
    render() {
        return (
            <ul className='user-anchor'>
                <li>akak4456</li>
                <li>설정</li>
                <li>로그아웃</li>
            </ul>
        )
    }
}

class PCHeader extends React.Component {
    render() {
        return(
            <header className='header-root'>
                <Logo />
                <div className='header-right-side'>
                    <div className='header-user-anchor-group'>
                        <UserAnchor />
                    </div>
                    <div className='header-button-group'>
                        <TapButton buttonElement={"문제"} linkTo={"/problem-list"} />
                        <TapButton buttonElement={"오답노트"} />
                        <TapButton buttonElement={"게시판"} />
                        <TapButton buttonElement={<img src={iconSearch}></img>} />
                    </div>
                </div>
            </header>
        )
    }
}

export default class Header extends React.Component {
    render() {
        // TODO 나중에 모바일 및 반응형 컴포넌트 제작하기
        return (
            <>
                <Mobile><p>Header Mobile</p></Mobile>
                <PC><PCHeader/></PC> 
            </>
        );
    }
}