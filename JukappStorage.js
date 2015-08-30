var React = require('react-native');
var Dispatcher = require('./Dispatcher');

var {
  AsyncStorage
} = React;

var JUKAPP_STORAGE_KEY = '@JukappStorage:key';

var JukappStorage = {
  loadFromStorage() {
    // AsyncStorage.removeItem(JUKAPP_STORAGE_KEY);
    this.getItem()
      .then((store) => {
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
  },

  removeItem(key) {
    this.setItem(key, null);
  },

  setItem(key, value) {
    this.getItem()
      .then((store) => {
        if (store == undefined) store = {};

        store[key] = value;
        AsyncStorage.setItem(JUKAPP_STORAGE_KEY, JSON.stringify(store));
      })
      .catch((err) => {
        console.log('[JukappStorage] Error when setting item', err);
      });
  },

  getItem() {
    return AsyncStorage.getItem(JUKAPP_STORAGE_KEY).then((value) => JSON.parse(value));
  }
};

module.exports = JukappStorage;
