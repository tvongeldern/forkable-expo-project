const types = {
	start: 'actions/demo/readFromStorage/start',
	success: 'actions/demo/readFromStorage/success',
	fail: 'actions/demo/readFromStorage/fail',
};

export const reducer = {
	[types.start]: (state) => ({
		...state,
	}),
	[types.success]: (state, action) => ({
		...state,
		storage: {
			...state.storage,
			[action.key]: action.response,
		},
	}),
	[types.fail]: (state) => ({
		...state,
	}),
};

export const actionCreator = (key) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ storage }) => storage.get(key),
	key,
});
