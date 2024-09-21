import { commonAPI } from './Common';

export const getInfoEdit = (onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/member/my/info-edit',
			{},
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

export const patchInfoEdit = (formValue, onSuccess, onError) => {
	commonAPI
		.patch(
			'/api/v1/member/my/info-edit',
			{
				memberId: formValue.id,
				memberPw: formValue.pw,
				statusMessage: formValue.statusMessage,
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

export const changePw = (formValue, onSuccess, onError) => {
	commonAPI
		.patch(
			'/api/v1/member/my/change-pw',
			{
				currentPw: formValue.currentPw,
				newPw: formValue.newPw,
				newPwCheck: formValue.newPwCheck,
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

export const withdraw = (onSuccess) => {
	commonAPI
		.delete(
			'/api/v1/member/my/withdraw',
			{},
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

export const getInfo = (memberId, onSuccess, onError) => {
	commonAPI
		.get(
			`/api/v1/member/info?memberId=${memberId}`,
			{},
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
