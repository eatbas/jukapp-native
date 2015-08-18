/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var RoomsListView = require('./RoomsListView')
var JukappStore = require('./JukappStore')
var RoomView = require('./RoomView')

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} = React;

var Jukapp = React.createClass({
  getInitialState: function() {
    return {
      isInRoom: JukappStore.isInRoom()
    }
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
  },

  render: function() {
    if (!this.state.isInRoom) {
      return this.renderRoomsList();
    }

    return (<RoomView/>)
  },

  renderRoomsList: function() {
    return (<RoomsListView />)
  },

  _onChange: function() {
    this.setState({
      isInRoom: JukappStore.isInRoom()
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
