import { commonAPI } from './Common';

export const getProgramLanguageByProblem = (problemNo, onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/programlanguage/' + problemNo,
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

export const newSubmit = (formValue, onSuccess, onError) => {
	commonAPI
		.post('/api/v1/compile', formValue, {
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

export const getProblemGrade = (submitNo, onSuccess, onError) => {
	commonAPI
		.get('/api/v1/submit/' + submitNo, {
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

export const getReflectionNoteList = (
	page,
	size,
	title,
	langCode,
	resultCode,
	onSuccess,
	onError
) => {
	let additional = '';
	if (title) {
		additional += '&title=' + title;
	}
	if (langCode) {
		additional += '&langCode=' + langCode;
	}
	if (resultCode) {
		additional += '&resultCode=' + resultCode;
	}
	commonAPI
		.get(
			'/api/v1/submit?page=' + page + '&size=' + size + additional,
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
export const getAllProgramLanguage = (onSuccess, onError) => {
	commonAPI
		.get(
			'/api/v1/programlanguage',
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

export const getSubmitStatistics = (memberId, onSuccess, onError) => {
	commonAPI
		.get(
			`/api/v1/submit/statistics?memberId=${memberId}`,
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
