export function aggregateReducers(reducers) {
	return Object.values(reducers)
		.reduce((accumulator, reducer) => ({
			...accumulator,
			...reducer,
		}), {});
}
