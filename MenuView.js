'use strict';

var React = require('react-native');
var FavoritesListView = require('./FavoritesListView');

var {
  StyleSheet,
  View,
  Text,
} = React;

var MenuView = React.createClass({
  favorites: function() {
    this.props.menuActions.close();

    this.props.navigator.push({
        component: FavoritesListView,
        title: 'Favorites',
    });
  },

  render: function() {
    return (
      <View>
        <Text>Menu</Text>
        <Text onPress={this.favorites}>Favorites</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = MenuView
