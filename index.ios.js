/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var FavoritesListView = require('./FavoritesListView')
var SearchResultsListView = require('./SearchResultsListView')

var Jukapp = React.createClass({
  _handleNextButtonPress: function() {
    this.refs.nav.push({
      component: FavoritesListView,
      title: 'Favorites'
    });
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

AppRegistry.registerComponent('Jukapp', () => Jukapp);
