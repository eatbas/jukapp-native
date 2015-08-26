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
      loading: true
    };
  },

  componentDidMount: function() {
    JukappApi.addEventListener((message) => {
      this._refreshList();
    });

    JukappStore.addChangeListener(this._onChange);

    this._refreshList();
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  },

  _refreshList: function() {
    JukappApi.fetchQueuedVideos().done(JukappActions.loadedQueuedVideos);
  },

  _onChange: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getQueuedVideos()),
      loading: false,
    })
  },

  _renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} onFavoriteToggled={this._refreshList} />
    );
  },

  _renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  render: function() {
    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderFooter={this._renderFooter}
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
