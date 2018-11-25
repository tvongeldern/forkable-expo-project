import { AsyncStorage } from 'react-native';
import config from '../config';

// JSON modifiers for AsyncStorage middleware
function jsonParse(value) {
	try {
		return JSON.parse(value);
	} catch (e) {
		console.error(e);
		return value;
	}
}

function jsonStringify(value) {
	if (typeof value === 'object') {
		return JSON.stringify(value);
	}
	return value || '';
}
//

const FETCH_API = fetch;
const STORAGE_API = {
	set: (key, value) => AsyncStorage.setItem(key, jsonStringify(value)),
	get: (key) => AsyncStorage.getItem(key).then(jsonParse),
	remove: AsyncStorage.removeItem,
};

export default function middleware() {
	return ({ dispatch, getState }) => {
		return next => action => {
			// For actionCreators that are just functions,
			// apply them directly
			if (typeof action === 'function') {
				return action(dispatch, getState);
			}
			// If action is an object, it will be an ajax call
			const {
				fetch,
				storage,
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
			// Dispatch AJAX calls
			if (fetch) {
				const requestUrl = config.apiUrl + fetch.url;
				// REQUEST will be dispatched first
				next({ ...rest, type: REQUEST });
				return FETCH_API(requestUrl, {
					credentials: 'include',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					method: fetch.method || 'GET',
					body: fetch.data && JSON.stringify(fetch.data),
				})
					.then(response => {
						if (response.status === 404) {
							return Promise.reject({
								status: 404,
								error: 'Resource not found',
							});
						}
						if (response.status === 204) {
							return Promise.resolve();
						}
						return response.json()
					})
					// Dispatch SUCCESS if call succeeds
					.then(response => {
						// Determine success.failure based on response status
						const isFailure = response && response.status > 399;
						// Save response to local storage key if one is specified
						// or delete local storage key if it was a DELETE call
						if (fetch.localStorageKey) {
							if (fetch.method === 'DELETE') {
								STORAGE_API.remove(fetch.localStorageKey);
							} else {
								STORAGE_API.set(fetch.localStorageKey, response);
							}
						}
						return next({
							...rest,
							response,
							type: isFailure ? FAILURE : SUCCESS,
							error: isFailure ? response.message || response.status : null,
						});
					})
					// Dispatch FAILURE if call fails
					.catch(error => next({
						...rest,
						error,
						type: FAILURE,
					}));
			}
			// Dispatch AsyncStorage requests
			if (storage) {
				next({ ...rest, type: REQUEST });
				return storage(STORAGE_API)
					.then(data => next({ ...rest, data, type: SUCCESS }))
					.catch(error => next({ ...rest, error, type: FAILURE }));
			}
		}
	}
}