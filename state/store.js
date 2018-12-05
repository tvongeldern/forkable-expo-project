import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as reducers from './reducers';
import middleware from './middleware';

const appReducer = combineReducers({
	form: formReducer,
	...reducers,
});

export default createStore(
	appReducer,
	applyMiddleware(middleware()),
);
