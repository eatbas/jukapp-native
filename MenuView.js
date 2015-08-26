'use strict';

var React = require('react-native');
var MenuItemView = require('./MenuItemView');
var JukappStore = require('./JukappStore');
var JukappActions = require('./JukappActions');

var {
  Icon
} = require('react-native-icons');

var {
  StyleSheet,
  View,
  Text,
} = React;

var MenuView = React.createClass({
  _leaveRoom: function() {
    JukappActions.leftRoom();
  },

  render: function() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Icon
            name='fontawesome|rss'
            size={20}
            color='black'
            style={styles.icon}
          />
          <Text style={styles.headerMainText}>{JukappStore.getCurrentRoom().name}</Text>
        </View>

        <MenuItemView
          scene='room'
          title='Room'
          icon='fontawesome|home'
          navigator={this.props.navigator}
          menuActions={this.props.menuActions}
        />

        <MenuItemView
          scene='search'
          title='Search'
          icon='fontawesome|search'
          navigator={this.props.navigator}
          menuActions={this.props.menuActions}
        />

        <MenuItemView
          scene='favorites'
          title='Favorites'
          icon='fontawesome|star'
          navigator={this.props.navigator}
          menuActions={this.props.menuActions}
        />

        <MenuItemView
          scene='account'
          title='My Account'
          icon='fontawesome|user'
          navigator={this.props.navigator}
          menuActions={this.props.menuActions}
        />

        <MenuItemView
          title='Leave Room'
          icon='fontawesome|sign-out'
          navigator={this.props.navigator}
          onPress={this._leaveRoom}
          menuActions={this.props.menuActions}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
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
    height: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F7F7',
  },

  headerMainText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

module.exports = MenuView
