import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
	const today = new Date();
	const expireDate = today.setDate(today.getDate() + 7);

	return cookies.set('refresh_token', refreshToken, {
		sameSite: 'strict',
		path: '/',
		expires: new Date(expireDate),
		// httpOnly: true, httpOnly를 true 로 설정하면 getCookieToken 이 호출이 안되는 문제가 있음
	});
};

export const getCookieToken = () => {
	return cookies.get('refresh_token');
};

export const removeCookieToken = () => {
	return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
