const types = {
	start: 'actions/demo/saveToStorage/start',
	success: 'actions/demo/saveToStorage/success',
	fail: 'actions/demo/saveToStorage/fail',
};

export const reducer = {
	[types.start]: (state) => ({
		...state,
	}),
	[types.success]: (state, action) => ({
		...state,
		storage: {
			...state.storage,
			[action.key]: action.value,
		},
	}),
	[types.fail]: (state) => ({
		...state,
	}),
};

export const actionCreator = (key, value) => ({
	types: [types.start, types.success, types.fail],
	promise: ({ storage }) => storage.set(key, value),
	key,
	value,
});
