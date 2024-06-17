import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './reset.css';
import './theme.css';
import './index.css';
import Intro from './main/intro/intro.js';
import ProblemList from './main/problem-list/problem-list.js';
import ReflectionNote from './main/reflection-note/reflection-note.js';
import Board from './main/board/board.js';
import Search from './main/search/search.js';
import Footer from './footer/footer.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Join from './main/join/join.js';
import Login from './main/login/login.js';
import PwFind from './main/pw-find/pw-find.js';
import PwReset from './main/pw-reset/pw-reset.js';
import SettingInfoEdit from './main/setting/info-edit/setting-info-edit.js';
import SettingPwChange from './main/setting/pw-change/setting-pw-change.js';
import SettingWithdraw from './main/setting/withdraw/setting-withdraw.js';
import User from './main/user/user.js';
function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Intro/>}></Route>
                    <Route path="/problem-list/*" element={<ProblemList/>}></Route>
                    <Route path="/reflection-note/*" element={<ReflectionNote/>}></Route>
                    <Route path="/board/*" element={<Board/>}></Route>
                    <Route path="/search/*" element={<Search/>}></Route>
                    <Route path="/join/*" element= {<Join/>}></Route>
                    <Route path="/login/*" element= {<Login/>}></Route>
                    <Route path="/agree/*" ></Route> // TODO
                    <Route path="/pw-find/*" element = {<PwFind />}></Route>
                    <Route path="/pw-reset/*" element = {<PwReset />}></Route>
                    <Route path="/setting/info-edit" element = {<SettingInfoEdit />}></Route>
                    <Route path="/setting/pw-change" element = {<SettingPwChange />}></Route>
                    <Route path="/setting/withdraw" element = {<SettingWithdraw />}></Route>
                    <Route path="/user/*" element = { <User />}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);