/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var RoomsListView = require('./RoomsListView')
var JukappStore = require('./JukappStore')
var JukappActions = require('./JukappActions');
var SearchResultsListView = require('./SearchResultsListView')
var FavoritesListView = require('./FavoritesListView')
var LoginView = require('./LoginView')
var RoomView = require('./RoomView')

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  NavigatorIOS
} = React;

var Jukapp = React.createClass({
  getInitialState: function() {
    return {
      isInRoom: JukappStore.isInRoom(),
      isLoggedIn: JukappStore.isLoggedIn()
    }
  },

  componentDidMount: function() {
    JukappStore.initialize();
    JukappStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _handleNextButtonPress: function() {
    this.refs.nav.push({
        component: FavoritesListView,
        title: 'Favorites',
        rightButtonTitle: 'Search',
        onRightButtonPress: this._handleSearchButtonPress
    });
  },

  _handleSearchButtonPress: function() {
    this.refs.nav.push({
      component: SearchResultsListView,
      title: "Search"
    });
  },

  _handleBackButtonPress: function() {
    JukappActions.leftRoom();
  },

  render: function() {
    if (!this.state.isInRoom) {
      return this.renderRoomsList();
    }

    return (
      <NavigatorIOS
        style={styles.container}
        ref='nav'
        initialRoute={{
          component: RoomView,
          title: 'Queue',
          rightButtonTitle: 'Favorites',
          onRightButtonPress: this._handleNextButtonPress,
          leftButtonTitle: 'Leave',
          onLeftButtonPress: this._handleBackButtonPress,
        }}
      />)
  },

  renderRoomsList: function() {
    return (<RoomsListView />)
  },

  _onChange: function() {
    this.setState({
      isInRoom: JukappStore.isInRoom(),
      isLoggedIn: JukappStore.isLoggedIn()
    })
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Jukapp', () => Jukapp);
