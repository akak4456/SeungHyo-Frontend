import React from 'react';
import ReactDOM from 'react-dom';
import './header.css';
import {Mobile, PC} from '../responsive.js';

export default class Header extends React.Component {
    render() {
        // TODO 나중에 모바일 및 반응형 컴포넌트 제작하기
        return (
            <div>
                <Mobile><p>Header Mobile</p></Mobile>
                <PC><p>Header PC23</p></PC> 
            </div>
        );
    }
}