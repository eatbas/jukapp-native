var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var EventEmitter = require('events').EventEmitter;
var {
  AsyncStorage
} = React;

var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var JUKAPP_STORE_KEY = '@JukappStore:key'

var currentRoom;
var user;
var favorites = [];
var rooms = [];
var searchResults = [];
var queuedVideos = [];
var lastQuery;

function joinedRoom(room) {
  currentRoom = room;
  syncStorage();
}

function loggedOut() {
  user = null;
  syncStorage();
}

function leftRoom() {
  currentRoom = null;
  syncStorage();
}

function loggedIn(loginUser) {
  user = loginUser;
  syncStorage();
}

function syncStorage() {
  var store = JSON.stringify({
    user: user,
    room: currentRoom
  });

  AsyncStorage.setItem(JUKAPP_STORE_KEY, store);
}

var JukappStore = assign({}, EventEmitter.prototype, {

  initialize: function() {
    // AsyncStorage.removeItem(JUKAPP_STORE_KEY);
    AsyncStorage.getItem(JUKAPP_STORE_KEY).then((value) => {
      var store = JSON.parse(value);
      if (store) {
        console.log(store);
        if (store.room) {
          currentRoom = store.room;
        }

        if (store.user) {
          user = store.user;
        }
      }
    });
  },

  isInRoom: function() {
    return !!currentRoom
  },

  isLoggedIn: function() {
    return !!user;
  },

  isFavoriteVideo: function(video) {
    for (var id in favorites) {
      if (favorites[id]["video"].youtube_id == video.youtube_id) {
        return true;
      }
    }

    return false;
  },

  getUser: function() {
    if (this.isLoggedIn()) {
      return user;
    }
  },

  getRooms: function() {
    return rooms;
  },

  getCurrentRoom: function() {
    return currentRoom;
  },

  getSearchResults: function() {
    return searchResults;
  },

  getLastQuery: function() {
    return lastQuery;
  },

  getQueuedVideos: function() {
    return queuedVideos;
  },

  getFavorites: function() {
    return favorites;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  switch(action.actionType) {
    case 'loaded-rooms':
      rooms = action.rooms;
      JukappStore.emitChange();
      break;

    case 'joined-room':
      joinedRoom(action.room);
      JukappStore.emitChange();
      break;

    case 'left-room':
      leftRoom();
      JukappStore.emitChange();
      break;

    case 'logged-in':
      loggedIn(action.user);
      JukappStore.emitChange();
      break;

    case 'logged-out':
      loggedOut();
      JukappStore.emitChange();
      break;

    case 'loaded-queued-videos':
      queuedVideos = action.queuedVideos;
      JukappStore.emitChange();
      break;


    case 'loaded-favorites':
      favorites = action.favorites;
      JukappStore.emitChange();
      break;

    case 'completed-search':
      searchResults = action.searchResults;
      console.log('ac ' + action.query);
      lastQuery = action.query;
      JukappStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = JukappStore;