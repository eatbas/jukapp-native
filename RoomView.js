'use strict';

var React = require('react-native');
var SearchResultsListView = require('./SearchResultsListView');
var FavoritesListView = require('./FavoritesListView');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');

var {
  StyleSheet,
  NavigatorIOS,
} = React;

var RoomView = React.createClass({


  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        ref='nav'
        initialRoute={{
          component: SearchResultsListView,
          title: 'Search',
          rightButtonTitle: 'Favorites',
          onRightButtonPress: this._handleNextButtonPress,
          leftButtonTitle: 'Leave',
          onLeftButtonPress: this._handleBackButtonPress,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = RoomView
