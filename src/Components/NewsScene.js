import React, { PureComponent } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,
	RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { setTopNews } from '@actions/TopHeadingNewsActions';
import Pulse from 'react-native-pulse';
import GridView from 'react-native-gridview';
import { Images } from '@images/Images';

class NewsScene extends PureComponent {
	state = {
		refreshing: false
	};

	componentDidMount() {
		this.props.setTopNews();
	}

	_onRefresh() {
		if (this.state.refreshing) {
			return;
		}
		this.setState({ refreshing: true });
		this.props.setTopNews();
		if (this.props.showApiData) {
			this.setState({ refreshing: false });
		}
	}

	render() {
		const self = this;
		const { showApiData, articles } = this.props;
		console.log(showApiData);
		return (
			<View style={styles.container}>
				<View
					style={{
						height: 50,
						backgroundColor: 'rgb(2,136,141)',
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.openDrawer();
						}}
					>
						<Image source={Images.menu.source} style={{ width: 25, height: 25, marginLeft: 5 }} />
					</TouchableOpacity>
					<Text style={{ textSize: 15, color: 'white', marginLeft: 20 }}>Samachar</Text>
				</View>
				{!showApiData && <Pulse color="rgb(2,136,141)" numPulses={5} diameter={100} speed={10} duration={2000} />}
				{showApiData && (
					<View>
						<GridView
							data={articles}
							itemsPerRow={2}
							refreshControl={
								<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />
							}
							renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
								console.log(item, ' ' + sectionID, ' ' + rowID, ' ' + itemIndex, ' ' + itemID);
								return (
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.navigate('NewsDetailScene', { index: itemID });
										}}
									>
										<View style={{ backgroundColor: 'white', margin: 7, height: 200, borderRadius: 8 }}>
											<Image
												source={{ uri: item.urlToImage }}
												style={{
													flex: 1,
													height: 150,
													borderTopLeftRadius: 10,
													resizeMode: 'cover',
													borderTopRightRadius: 10
												}}
											/>
											<Text numberOfLines={3} style={{ marginTop: 5, padding: 5 }}>
												{item.title}
											</Text>
										</View>
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

const mapDispatchToProps = dispatch => {
	return {
		setTopNews: props => {
			dispatch(setTopNews(props));
		}
	};
};

const mapStateToProps = state => {
	return {
		articles: state.new_reducer.articles,
		showApiData: state.new_reducer.showApiData
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsScene);
