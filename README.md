# Samachar
```
git clone https://github.com/kajal-mittal/Samachar.git
cd Samachar
npm install

react-native run-ios
react-native run-android
```
# App Features (React Native)

1. redux-saga
2. axios
3. TabBar
4. Navigation Drawer
5. WebView

# redux-saga
## Getting Started
Saga is like a separate thread in your application that's solely responsible for side effects. **redux-saga** is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test.
```
npm install redux-saga
```
### Example
Suppose we have a UI to fetch some data from a remote server. 

We'll create a Saga that watches for all API_CALL_REQUEST actions and triggers an API call to fetch the news data.
```sagas.js```
```
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
```






