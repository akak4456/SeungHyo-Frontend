import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './reset.css';
import './theme.css';
import './index.css';
import Intro from './pages/intro.js';
import ProblemList from './pages/problem-list.js';
import ReflectionNoteList from './pages/reflection-note-list.js';
import Board from './pages/board.js';
import SearchPage from './pages/search.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Join from './pages/join.js';
import Login from './pages/login.js';
import PwFind from './pages/pw-find.js';
import PwReset from './pages/pw-reset.js';
import SettingInfoEdit from './pages/setting-info-edit.js';
import SettingPwChange from './pages/setting-pw-change.js';
import SettingWithdraw from './pages/setting-withdraw.js';
import User from './pages/user.js';
import Problem from './pages/problem.js';
import ReflectionNote from './pages/reflection-note.js';
import Write from './pages/write.js';
import Article from './pages/article.js';
import Layout from './components/layout.js';
import PrivateRoute from './PrivateRoute.js';
import persistStore from 'redux-persist/es/persistStore';
import Submit from './pages/submit.js';
import { PersistGate } from 'redux-persist/integration/react';
import { getCookieToken } from './store/Cookie.js';

const persistor = persistStore(store);
function usePreventRefresh() {
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			// 경고 메시지 설정
			event.preventDefault();
			event.returnValue = ''; // 대부분의 브라우저에서 빈 문자열이 필요합니다.
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);
}
function Root() {
	usePreventRefresh(); // 새로 고침 방지 Hook 호출
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<Layout>
									<Intro />
								</Layout>
							}
						></Route>
						<Route
							path="/problem-list/*"
							element={
								<Layout>
									<ProblemList />
								</Layout>
							}
						></Route>
						<Route
							path="/reflection-note-list/*"
							element={
								<Layout>
									<ReflectionNoteList />
								</Layout>
							}
						></Route>
						<Route
							path="/board/*"
							element={
								<Layout>
									<Board />
								</Layout>
							}
						></Route>
						<Route
							path="/search/*"
							element={
								<Layout>
									<SearchPage />
								</Layout>
							}
						></Route>
						<Route
							path="/join/*"
							element={
								<Layout>
									<Join />
								</Layout>
							}
						></Route>
						<Route
							path="/login/*"
							element={
								<Layout>
									<Login />
								</Layout>
							}
						></Route>
						<Route path="/agree/*"></Route> // TODO
						<Route
							path="/pw-find/*"
							element={
								<Layout>
									<PwFind />
								</Layout>
							}
						></Route>
						<Route
							path="/pw-reset/*"
							element={
								<Layout>
									<PwReset />
								</Layout>
							}
						></Route>
						<Route
							path="/setting/info-edit"
							element={
								<PrivateRoute>
									<Layout>
										<SettingInfoEdit />
									</Layout>
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/setting/pw-change"
							element={
								<Layout>
									<SettingPwChange />
								</Layout>
							}
						></Route>
						<Route
							path="/setting/withdraw"
							element={
								<Layout>
									<SettingWithdraw />
								</Layout>
							}
						></Route>
						<Route
							path="/user/*"
							element={
								<Layout>
									<User />
								</Layout>
							}
						></Route>
						<Route
							path="/problem/*"
							element={
								<Layout>
									<Problem />
								</Layout>
							}
						></Route>
						<Route
							path="/reflection-note/*"
							element={
								<Layout>
									<ReflectionNote />
								</Layout>
							}
						></Route>
						<Route
							path="/write/*"
							element={
								<Layout>
									<Write />
								</Layout>
							}
						></Route>
						<Route
							path="/article/*"
							element={
								<Layout>
									<Article />
								</Layout>
							}
						></Route>
						<Route
							path="/submit/add/*"
							element={
								<PrivateRoute>
									<Layout>
										<Submit isNew={true} />
									</Layout>
								</PrivateRoute>
							}
						></Route>
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
