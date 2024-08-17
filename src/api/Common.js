import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
	getCookieToken,
	removeCookieToken,
	setRefreshToken,
} from '../store/Cookie';
import { SET_TOKEN } from '../store/Auth';
import { reissue } from './Auth';

const commonAPI = axios.create({});
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const useAxiosInterceptor = () => {
	const token = useSelector((state) => state.authToken.accessToken);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	if (!token && getCookieToken()) {
		console.log(getCookieToken());
		reissue(
			getCookieToken(),
			(response) => {
				dispatch(SET_TOKEN(response.data));
				setRefreshToken(response.headers['new-refresh-token']);
			},
			(e) => {
				alert('로그아웃 되었습니다. 다시 로그인해주세요');
				removeCookieToken();
				navigate('/');
			}
		);
	}

	const errorHandler = (error) => {
		console.log('errInterceptor!', error);
		// if (error.response.status === 401) {
		// 	navigate('/');
		// }
		return Promise.reject(error);
	};

	const requestHandler = (config) => {
		config.headers = {
			Authorization: !!token ? `Bearer ${token}` : '',
			'Refresh-Token': getCookieToken(),
		};
		return config;
	};

	const responseHandler = (response) => {
		if (response.headers.has('authorization')) {
			const newToken = response.headers['authorization'].substring(7);
			if (newToken !== token) {
				dispatch(SET_TOKEN(newToken));
			}
		}
		return response;
	};

	const requestInterceptor = commonAPI.interceptors.request.use(requestHandler);

	const responseInterceptor = commonAPI.interceptors.response.use(
		(response) => responseHandler(response),
		(error) => errorHandler(error.response.data)
	);

	useEffect(() => {
		return () => {
			commonAPI.interceptors.request.eject(requestInterceptor);
			commonAPI.interceptors.response.eject(responseInterceptor);
		};
	}, [responseInterceptor, requestInterceptor]);
};

export { useAxiosInterceptor, commonAPI };
