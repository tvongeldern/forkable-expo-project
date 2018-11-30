const types = {
	start: 'actions/demo/connectionTest/start',
	success: 'actions/demo/connectionTest/success',
	fail: 'actions/demo/connectionTest/fail',
};

export const reducer = {
	[types.start]: (state) => ({
		...state,
		connectionTestStatus: 1,
	}),
	[types.success]: (state, action) => ({
		...state,
		connectionTestStatus: 2,
		apiResponse: action.response, // API responses will always be stored as action.response
	}),
	[types.fail]: (state, action) => ({
		...state,
		connectionTestStatus: 0,
		error: action.error,
	}),
};

export const actionCreator = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ fetch }) => fetch('https://www.googleapis.com/books/v1/volumes?q=author:hemingway'),
});
