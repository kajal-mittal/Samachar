import { AppRegistry ,View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@store';
import  App from './App';

const RNRedux = () => (

	<Provider store={store}>
		<App />
	</Provider>
);
AppRegistry.registerComponent('Samachar', () => RNRedux);
