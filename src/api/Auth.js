import { commonAPI } from './Common';

export const loginUser = (id, pw, onSuccess) => {
	commonAPI
		.post(
			'/api/v1/member/auth/login',
			{
				memberId: id,
				memberPw: pw,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((response) => {
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};

export const join = (formValue, onSuccess) => {
	commonAPI
		.post(
			'/api/v1/member/auth/join',
			{
				memberId: formValue.id,
				memberPw: formValue.pw,
				memberPwCheck: formValue.pwcheck,
				statusMessage: formValue.statusMsg,
				email: formValue.email,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((response) => {
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};

export const logoutUser = (accessToken, refreshToken, onSuccess, onError) => {
	commonAPI
		.patch(
			'/api/v1/member/auth/logout',
			{
				accessToken: accessToken,
				refreshToken: refreshToken,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((response) => {
			if (response.data.code === '0') {
				onSuccess();
			}
		})
		.catch((exception) => {
			console.log(exception);
			onError();
		});
};

export const sendEmailCheckCode = (email, onSuccess) => {
	commonAPI
		.post(
			'/api/v1/member/auth/send-email-check-code',
			{
				toEmail: email,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((response) => {
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};

export const validEmailCheckCode = (email, code, onSuccess) => {
	commonAPI
		.post(
			'/api/v1/member/auth/valid-email',
			{
				email: email,
				code: code,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((response) => {
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};
