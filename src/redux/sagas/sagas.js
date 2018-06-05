import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import ApiUrl from '@Network/ApiUrl';
import Constants from '@Network/Constants';

// watcher saga: watches for actions dispatched to the store, starts worker saga
//A watcherSaga sees the action and triggers a workerSaga. Use saga helpers to watch for actions differently.

export default function* watcherSaga() {
	yield takeLatest('API_CALL_REQUEST', workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchArticles() {
	return axios.get(ApiUrl.URL_TOP_HEADINGS, {
		params: {
			country: Constants.country,
			category: Constants.category,
			apiKey: Constants.apiKey
		}
	});
}

// worker saga: makes the api call when watcher saga sees the action
//redux-saga helper function call, and stores the result (a resolved or failed Promise) in a response variable.
function* workerSaga() {
	try {
		const response = yield call(fetchArticles);
		yield put({ type: 'API_CALL_SUCCESS', response });
	} catch (error) {
		console.log(error);
		// dispatch a failure action to the store with the error
		yield put({ type: 'API_CALL_FAILURE', error });
	}
}
