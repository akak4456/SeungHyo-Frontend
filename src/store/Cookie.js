import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
	const today = new Date();
	let maxAge;
	console.log('keep login', getIsKeepLoginCookie());
	if (getIsKeepLoginCookie()) {
		maxAge = 7 * 86400; // 7일
	} else {
		maxAge = 7200; // 2시간
	}
	console.log('maxAge', maxAge);
	const expireDate = today.setTime(today.getTime() + maxAge * 1000);

	return cookies.set('refresh_token', refreshToken, {
		sameSite: 'strict',
		path: '/',
		maxAge: maxAge,
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

export const setIsKeepLoginCookie = (isKeep) => {
	return cookies.set('is_keep_login', isKeep, {
		sameSite: 'strict',
		path: '/',
	});
};

export const getIsKeepLoginCookie = () => {
	return cookies.get('is_keep_login');
};
