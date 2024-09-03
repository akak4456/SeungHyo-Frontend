import { commonAPI } from './Common';

export const getBoardList = (page, size, categoryCode, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const getBoardOne = (boardNo, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const getReplyList = (boardNo, page, size, onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const getBoardCategory = (onSuccess, onError) => {
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
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const addBoard = (form, onSuccess, onError) => {
	commonAPI
		.post(`/api/v1/board`, form, {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			onSuccess(response);
		})
		.catch((exception) => {
			onError(exception);
		});
};

export const getBoardInMainInfo = (onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/board/main',
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
