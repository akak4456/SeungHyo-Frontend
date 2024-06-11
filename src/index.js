import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './reset.css';
import './theme.css';
import './index.css';
import Header from './header/header.js';
import Intro from './main/intro/intro.js';
import ProblemList from './main/problem-list/problem-list.js';

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
                </Routes>
            </BrowserRouter>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);