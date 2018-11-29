import { aggregateReducers } from 'utils';
import * as reducers from './actions/reducers';

const initialState = {
	connectionTested: false,
	connectionTestPending: false,
	connectionTestPassed: false,
};

const aggregatedReducer = aggregateReducers(reducers);

export function reducer(state = initialState, action = {}) {
	if (aggregatedReducer[action.type]) {
		return aggregatedReducer[action.type](state, action);
	}
	return state;
}

export * from './actions';
