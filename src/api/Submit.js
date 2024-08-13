import { commonAPI } from './Common';

export const getProgramLanguageByProblem = (problemNo, onSuccess) => {
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
			if (response.data.code === '0') {
				onSuccess(response.data.data);
			}
		})
		.catch((exception) => {
			console.log(exception);
		});
};

export const newSubmit = (formValue, onSuccess) => {
	commonAPI
		.post('/api/v1/submit', formValue, {
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

export const getProblemGrade = (submitNo, onSuccess) => {
	commonAPI
		.get('/api/v1/submit/' + submitNo, {
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
