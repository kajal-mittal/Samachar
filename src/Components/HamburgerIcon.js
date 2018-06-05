import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';

export default class HamburgerIcon extends PureComponent {
	toggleDrawer = () => {
		//console.log(this.props.navigationProps);
		//this.props.navigationProps.toggleDrawer();
		DrawerActions.openDrawer();
	};

	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
					<Image
						source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
						style={{ width: 25, height: 25, marginLeft: 5 }}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}
