import { commonAPI } from './Common';

export const getInfoEdit = (onSuccess) => {
	commonAPI
		.get(
			'/api/v1/my/info-edit',
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

export const patchInfoEdit = (formValue, onSuccess) => {
	commonAPI
		.patch(
			'/api/v1/my/info-edit',
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
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};

export const changePw = (formValue, onSuccess) => {
	commonAPI
		.patch(
			'/api/v1/my/change-pw',
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
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};

export const withdraw = (onSuccess) => {
	commonAPI
		.delete(
			'/api/v1/my/withdraw',
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
