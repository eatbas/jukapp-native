/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
  getInitialState: function() {
    return {
      isLoggedIn: JukappStore.isLoggedIn()
    };
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _handleNextButtonPress: function() {
    this.refs.nav.push({
      component: FavoritesListView,
      title: 'Favorites'
    });
  },

  _handleBackButtonPress: function() {
    JukappActions.leftRoom();
  },

  _onChange: function() {
    console.log('onchange');
    this.setState({
      isLoggedIn: JukappStore.isLoggedIn()
    })
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
