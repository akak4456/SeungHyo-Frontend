import { commonAPI } from './Common';

export const getProblemList = (page, size, onSuccess) => {
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
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};
