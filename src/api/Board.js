import { commonAPI } from './Common';

export const getBoardList = (page, size, categoryCode, onSuccess) => {
	commonAPI
		.get(
			`/api/v1/board?page=${page}&size=${size}&categoryCode=${categoryCode}`,
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

export const getBoardOne = (boardNo, onSuccess) => {
	commonAPI
		.get(
			`/api/v1/board/${boardNo}`,
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
