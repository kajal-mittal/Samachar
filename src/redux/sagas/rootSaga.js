import { all, fork } from 'redux-saga/effects';
import watcherSaga from '@saga/sagas';

export default function* rootSaga() {
	yield all([fork(watcherSaga)]);
}
