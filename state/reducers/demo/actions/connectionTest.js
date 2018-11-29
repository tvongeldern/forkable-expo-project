const types = {
	start: 'actions/demo/connectionTest/start',
	success: 'actions/demo/connectionTest/success',
	fail: 'actions/demo/connectionTest/fail',
};

export const reducer = {
	[types.start]: (state, action) => ({
		...state,
		connectionTestPending: true,
		connectionTestPassed: false,
	}),
	[types.success]: (state, action) => ({
		...state,
		connectionTested: true,
		connectionTestPending: false,
		connectionTestPassed: true,
	}),
	[types.fail]: (state, action) => ({
		...state,
		connectionTested: true,
		connectionTestPending: false,
		connectionTestPassed: false,
	}),
};

export const actionCreator = () => ({
	types: [types.start, types.success, types.fail],
	promise: ({ fetch }) => fetch('https://www.googleapis.com/books/v1/volumes?q=author:hemingway'),
});
