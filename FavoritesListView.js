'use strict';

var React = require('react-native');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var VideoCell = require('./VideoCell');
var JukappApi = require('./JukappApi');
var LoginView = require('./LoginView');

var {
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

var FavoritesListView = React.createClass ({
  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: dataSource.cloneWithRows(JukappStore.getFavorites()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: true
    };
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
    if (this.state.isLoggedIn) {
      JukappApi.fetchFavorites();
    }
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} />
    )
  },

  renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  render: function() {
    if(!this.state.isLoggedIn) {
      return (<LoginView />);
    }

    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
      />
    );
  },

  _onChange: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getFavorites()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: false
    })
  },
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

module.exports = FavoritesListView
