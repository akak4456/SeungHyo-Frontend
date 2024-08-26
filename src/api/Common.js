import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
	getCookieToken,
	removeCookieToken,
	setRefreshToken,
} from '../store/Cookie';
import { SET_TOKEN, DELETE_TOKEN } from '../store/Auth';

const commonAPI = axios.create({});
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const useAxiosInterceptor = () => {
	const token = useSelector((state) => state.authToken.accessToken);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const requestHandler = async (config) => {
		if (!token && getCookieToken()) {
			try {
				const response = await fetch('/api/v1/member/auth/reissue', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Refresh-Token': getCookieToken(),
					},
				});
				dispatch(
					SET_TOKEN(
						response.headers.get('authorization').substring('Bearer '.length)
					)
				);
				setRefreshToken(response.headers.get('new-refresh-token'));
				config.headers = {
					Authorization: `Bearer ${response.headers.get('authorization').substring('Bearer '.length)}`,
					'Refresh-Token': getCookieToken(),
				};
			} catch (error) {
				console.error('토큰 재발급 실패:', error);
				removeCookieToken();
				dispatch(DELETE_TOKEN());
				navigate('/login');
				return Promise.reject(error);
			}
		} else if (token && getCookieToken()) {
			config.headers = {
				Authorization: !!token ? `Bearer ${token}` : '',
				'Refresh-Token': getCookieToken(),
			};
		}
		return config;
	};

	const errorHandler = (error) => {
		console.log('errInterceptor!', token, getCookieToken());
		if (error.response.status == 401) {
			alert('로그인이 유효하지 않습니다. 다시 로그인해주세요.');
			removeCookieToken();
			dispatch(DELETE_TOKEN());
			navigate('/login');
		}
		return Promise.reject(error);
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
		(error) => errorHandler(error)
	);

	useEffect(() => {
		return () => {
			commonAPI.interceptors.request.eject(requestInterceptor);
			commonAPI.interceptors.response.eject(responseInterceptor);
		};
	}, [responseInterceptor, requestInterceptor]);
};

export { useAxiosInterceptor, commonAPI };
