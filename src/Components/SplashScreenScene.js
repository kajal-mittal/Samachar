import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import NewsDetailScene from './NewsDetailScene';
import NewsDetail from './NewsDetail';
import NewsScene from './NewsScene';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation';

const isTabBarVisible = routes => {
	var isVisible = true;
	const screenNames = ['NewsDetailScene'];
	if (routes.length > 0) {
		for (let i = 0; i < routes.length; i++) {
			if (screenNames[0] == routes[i].routeName) {
				isVisible = false;
			}
		}
	}
	return isVisible;
};

const AppTabBar = createBottomTabNavigator(
	{
		TAB1: {
			screen: NewsScene
		},
		TAB2: { screen: NewsDetailScene }
	},
	{
		navigationOptions: ({ navigation }) => ({
			//navigation.state.routeName
			tabBarVisible: navigation.state.routes == undefined ? true : isTabBarVisible(navigation.state.routes),
			header: null,
			tabBarOptions: {
				activeTintColor: 'rgb(255,87,34)',
				inactiveTintColor: 'white',
				upperCaseLabel: true,
				style: {
					backgroundColor: 'rgb(2,136,141)'
				},
				labelStyle: {
					fontSize: 15,
					marginBottom: 10,
					fontStyle: 'bold'
				},
				indicatorStyle: {
					backgroundColor: 'rgb(255,87,34)',
					height: 3
				}
			}
		})
	}
);

const NewsSceneStack = createStackNavigator({
	TabBar: {
		screen: AppTabBar,
		navigationOptions: {
			header: null
		}
	},
	News: {
		screen: NewsScene,
		navigationOptions: {
			header: null
		}
	},
	NewsDetailScene: {
		screen: NewsDetailScene,
		navigationOptions:{
			gesturesEnabled: false,
			 drawerLockMode: 'locked-closed' ,
			 disableGestures: true


		}
	},
	

});
class SplashScreenScene extends PureComponent {
	static router = NewsSceneStack.router;
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<NewsSceneStack navigation={this.props.navigation} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default SplashScreenScene;
