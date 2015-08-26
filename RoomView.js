'use strict';

var React = require('react-native');
var SearchResultsListView = require('./SearchResultsListView');
var FavoritesListView = require('./FavoritesListView');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var VideoCell = require('./VideoCell');
var JukappApi = require('./JukappApi');

var {
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  ActivityIndicatorIOS,
} = React;

var RoomView = React.createClass({

  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: dataSource.cloneWithRows(JukappStore.getQueuedVideos()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: true
    };
  },

  componentDidMount: function() {
    JukappApi.addEventListener((message) => {
      JukappApi.fetchQueuedVideos();
    });

    JukappStore.addChangeListener(this._onChange);

    if (this.state.isLoggedIn) {
      JukappApi.fetchFavorites().done(() => {
        JukappApi.fetchQueuedVideos();
      });
    } else {
      JukappApi.fetchQueuedVideos();
    }
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },

  _onChange: function() {


    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getQueuedVideos()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: false,
      video: JukappStore.getQueuedVideos()[0]
    })
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData["video"]} />
    )
  },

  renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  render: function() {
    var image = null
    if (this.state.video) {
      image = {uri: 'http://img.youtube.com/vi/' + this.state.video.youtube_id + '/default.jpg' }
    }

    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EEF2F2',
  },

  listViewContent: {
    justifyContent: 'center',
  }
});

module.exports = RoomView
