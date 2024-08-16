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

export const getReplyList = (boardNo, page, size, onSuccess) => {
	commonAPI
		.get(
			`/api/v1/reply/${boardNo}?page=${page}&size=${size}`,
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

export const getBoardCategory = (onSuccess) => {
	commonAPI
		.get(
			`/api/v1/board/categories`,
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

export const addBoard = (form, onSuccess) => {
	commonAPI
		.post(`/api/v1/board`, form, {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};
