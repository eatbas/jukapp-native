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

var RoomsListView = require('./RoomsListView')

var Jukapp = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        ref='nav'
        initialRoute={{
          component: RoomsListView,
          title: 'Rooms'
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
