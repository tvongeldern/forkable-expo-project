import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as clientReducer } from './reducer';
import middleware from './middleware';

const appReducer = combineReducers({
	form: formReducer,
	store: clientReducer,
});

export default createStore(
	appReducer,
	applyMiddleware(middleware()),
);