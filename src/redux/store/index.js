import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create a redux store with our reducer above and middleware
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(rootSaga);

export default store;
