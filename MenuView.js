'use strict';

var React = require('react-native');
var FavoritesListView = require('./FavoritesListView');
var JukappStore = require('./JukappStore');
var JukappActions = require('./JukappActions');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

var MenuView = React.createClass({
  favorites: function() {
    this.props.menuActions.close();

    this.props.navigator.push({
        component: FavoritesListView,
        title: 'Favorites',
    });
  },

  leave: function() {
    this.props.menuActions.close();

    JukappActions.leftRoom();
  },

  render: function() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Icon
            name='fontawesome|music'
            size={20}
            color='black'
            style={styles.icon}
          />
          <Text style={styles.headerMainText}>Room Name</Text>
        </View>

        <TouchableHighlight
          style={styles.item}
          onPress={this.favorites}
          underlayColor="#ebeeee"
        >
          <View style={styles.itemContent}>
            <Icon
              name='fontawesome|star'
              size={20}
              color='black'
              style={styles.icon}
            />
            <Text style={styles.itemTitle}>Favorites</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.item}
          onPress={this.leave}
          underlayColor="#ebeeee"
        >
          <View style={styles.itemContent}>
            <Icon
              name='fontawesome|sign-out'
              size={20}
              color='black'
              style={styles.icon}
            />
            <Text style={styles.itemTitle}>Leave Room</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    flexDirection: 'column',
    flex: 1
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 16,
  },

  header: {
    padding: 16,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  headerMainText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  item: {
    padding: 16,
    height: 48,
    justifyContent: 'center',
  },

  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemTitle: {
    fontSize: 14,
  },
});

module.exports = MenuView
