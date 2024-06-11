import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './reset.css';
import './theme.css';
import style from './index.module.css';
import Header from './header/header.js';
import Intro from './main/intro/intro.js';
import ProblemList from './main/problem-list/problem-list.js';
import ReflectionNote from './main/reflection-note/reflection-note.js';
import Board from './main/board/board.js';
import Search from './main/search/search.js';
import Footer from './footer/footer.js';

class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Intro/>}></Route>
                    <Route path="/problem-list/*" element={<ProblemList/>}></Route>
                    <Route path="/reflection-note/*" element={<ReflectionNote/>}></Route>
                    <Route path="/board/*" element={<Board/>}></Route>
                    <Route path="/search/*" element={<Search/>}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);