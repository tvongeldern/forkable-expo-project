import { AsyncStorage } from 'react-native';

/*
*	Private methods
*/

// JSON modifiers for AsyncStorage middleware
function jsonParse(value) {
	if (!value) return value;
	if (typeof value !== 'object') return value;
	return JSON.parse(value);
}

function jsonStringify(value) {
	if (value && typeof value === 'object') {
		return JSON.stringify(value);
	}
	return value || '';
}

// Fetch API wrapper
// Handles JSON and XML responses
function handleFetchResponse(response) {
	// Prevents middleware from trying to turn
	// splash pages into JSON
	if (response.status === 404) {
		return Promise.reject({
			status: 404,
			error: 'Resource not found',
		});
	}
	// Resolve empty for status 204
	if (response.status === 204) {
		return Promise.resolve();
	}
	return response.json()
		.then(parsedResponse => {
			if (parsedResponse && parsedResponse.status > 399) {
				return Promise.reject(parsedResponse);
			}
			return parsedResponse;
		});
}
// Prototype
function WrappedFetchApi() {
	// GET
	this.get = (uri) => fetch(uri)
		.then(handleFetchResponse);
	// POST
	this.post = (uri, { body }) => fetch(uri, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: jsonStringify(body),
	}).then(handleFetchResponse);
	// PUT
	this.put = (uri, { body }) => fetch(uri, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: jsonStringify(body),
	}).then(handleFetchResponse);
	// DELETE
	this.delete = (uri) => fetch(uri, { method: 'DELETE' })
		.then(handleFetchResponse);
	// Default
	return (uri, config) => fetch(uri, config).then(handleFetchResponse);
}

// Filling in fetch and storage API's
const FETCH_API = new WrappedFetchApi();
const STORAGE_API = {
	set: (key, value) => AsyncStorage.setItem(key, jsonStringify(value)),
	get: (key) => AsyncStorage.getItem(key).then(response => jsonParse(response)),
	remove: AsyncStorage.removeItem,
};

/*
*	Public middleware method
*/

export default function middleware() {
	return ({ dispatch, getState }) => {
		return next => action => {
			// For actions that are functions, dispatch them
			if (typeof action === 'function') {
				return action(dispatch, getState);
			}
			const {
				promise,
				types,
				...rest
			} = action;
			// Dispatch standard action objects as-is
			if (!types) {
				return next(action);
			}
			// Async actions will have an array of 3 types
			// which will always be provided in order
			const [REQUEST, SUCCESS, FAILURE] = types;
			// REQUEST will be dispatched first
			next({ ...rest, type: REQUEST });
			return promise({ fetch: FETCH_API, storage: STORAGE_API })
				.then((response) => next({
					...rest,
					response,
					type: SUCCESS,
				}))
				.catch((error) => next({
					...rest,
					error,
					type: FAILURE,
				}));
		};
	};
}
