import { commonAPI } from './Common';

export const getProblemList = (page, size, onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/problem?page=' + page + '&size=' + size,
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

export const getProblem = (problemNo, onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/problem/' + problemNo,
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

export const getProblemInMainInfo = (onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/problem/main',
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
