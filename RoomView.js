/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchResultsListView = require('./SearchResultsListView')
var FavoritesListView = require('./FavoritesListView')

var {
  StyleSheet,
  NavigatorIOS,
} = React;

var RoomView = React.createClass({
  _handleNextButtonPress: function() {
    this.refs.nav.push({
      component: FavoritesListView,
      title: 'Favorites'
    });
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop()
  },

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
