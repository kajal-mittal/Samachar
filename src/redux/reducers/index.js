import { combineReducers } from 'redux';
import News from './News';

export default combineReducers({
	// the keys here are going to be the property of state that we are producing.
	new_reducer: News
});
