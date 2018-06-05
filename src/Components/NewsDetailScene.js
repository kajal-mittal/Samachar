import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, BackHandler, WebView, ScrollView } from 'react-native';
import * as actions from '@actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Pulse from 'react-native-pulse';

class NewsDetailScene extends PureComponent {
	state = {
		imageLoader: false,
		refreshing: true
	};
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.routeName}`,
		headerTitleStyle: { textAlign: 'left', alignSelf: 'center' },
		headerStyle: {
			backgroundColor: 'white'
		},
		 drawerLockMode: 'locked-closed' ,
		 disableGestures: true,
		 gesturesEnabled:false

	});
	componentDidMount() {
		setTimeout(() => {
			this.setState({ imageLoader: true });
		}, 100);

	}
	loadEnd(){
		this.setState({ refreshing: false });
	}
	render() {
		const { navigation } = this.props;
		index = navigation.getParam('index', 0);
		return (
			<ScrollView style={{ flex: 1 }}>
				<View style={{ flex: 1, margin: 10 }}>
					<View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
						{this.state.imageLoader && (
							<Image
								style={{ resizeMode: 'cover', width: '100%', height: 200 }}
								source={{ uri: this.props.articles[index].urlToImage }}
							/>
						)}
					</View>
					<Text style={{ fontSize: 20, color: 'black', fontStyle: 'bold' }}>{this.props.articles[index].title}</Text>
					<Text style={{ fontSize: 15, color: 'rgba(0,0,0,0.8)', marginTop: 10, fontStyle: 'normal' }}>
						{this.props.articles[index].description}
					</Text>
					<Text style={{ fontSize: 15, color: 'rgba(0,0,0,0.8)', marginTop: 10, fontStyle: 'normal' }}>
						{this.props.articles[index].publishedAt}
					</Text>
					<View style={{ height: 500, flex: 1 }}>
						{this.state.refreshing && (
							<Pulse color="rgb(2,136,141)" numPulses={5} diameter={100} speed={10} duration={2000} />
						)}
						<WebView
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								height: 500
							}}
							onLoad={() => {
								this.loadEnd.bind(this);
							}}
							source={{ uri: this.props.articles[index].url }}
							javaScriptEnabled={true}
							domStorageEnabled={true}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

NewsDetailScene.defaultProps = {
	index: PropTypes.number.isRequired
};

function mapStateToProps(state) {
	return {
		articles: state.new_reducer.articles
	};
}
export default connect(mapStateToProps)(NewsDetailScene);
