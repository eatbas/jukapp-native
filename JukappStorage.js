var React = require('react-native');
var Dispatcher = require('./Dispatcher');

var {
  AsyncStorage
} = React;

var JUKAPP_STORAGE_KEY = '@JukappStorage:key';

var JukappStorage = {
  loadFromStorage() {
    // AsyncStorage.removeItem(JUKAPP_STORAGE_KEY);
    AsyncStorage.getItem(JUKAPP_STORAGE_KEY).then((value) => {
      var store = JSON.parse(value);
      if (store) {
        if (store.room) {
          Dispatcher.dispatch({
            type: 'joinRoom',
            room: store.room
          });
        }

        if (store.user) {
          Dispatcher.dispatch({
            type: 'login',
            user: store.user
          });
        }
      }
    });
  }
};

module.exports = JukappStorage;
