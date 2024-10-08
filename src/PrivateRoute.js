import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCookieToken } from './store/Cookie';

const PrivateRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.authToken.authenticated);
	return isAuthenticated || getCookieToken() ? (
		children
	) : (
		<Navigate to="/" {...alert('접근할 수 없는 페이지입니다.')} />
	);
};

export default PrivateRoute;
