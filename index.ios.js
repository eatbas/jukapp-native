/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var RoomsListView = require('./RoomsListView')

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} = React;

var Jukapp = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{
          component: RoomsListView,
          title: 'Rooms'
        }}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
            console.log(route, navigator);

            if (route.component) {
                return React.createElement(route.component, { navigator });
            }
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
