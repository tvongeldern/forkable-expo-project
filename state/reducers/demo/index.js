import { aggregateReducers } from 'utils';
import * as reducers from './actions/reducers';

const initialState = {
	connectionTestStatus: -1,
};

const aggregatedReducer = aggregateReducers(reducers);

export function reducer(state = initialState, action = {}) {
	if (aggregatedReducer[action.type]) {
		return aggregatedReducer[action.type](state, action);
	}
	return state;
}

export * from './actions';
