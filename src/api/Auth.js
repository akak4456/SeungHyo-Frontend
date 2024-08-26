import { commonAPI } from './Common';

export const loginUser = (id, pw, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const join = (formValue, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const sendEmailCheckCode = (email, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const validEmailCheckCode = (email, code, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const reissue = (refreshToken) => {
	return new Promise((resolve, reject) => {
		commonAPI
			.post(
				'/api/v1/member/auth/reissue',
				{},
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json',
						'Refresh-Token': refreshToken,
					},
				}
			)
			.then((response) => {
				resolve(response);
			})
			.catch((exception) => {
				reject(exception);
			});
	});
};
