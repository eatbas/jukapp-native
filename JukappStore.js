var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var currentRoom;
var user;
var favorites = [];
var rooms = [];
var searchResults = [];

var JukappStore = assign({}, EventEmitter.prototype, {

  isInRoom: function() {
    return !!currentRoom
  },

  isLoggedIn: function() {
    return !!user;
  },

  isFavoriteVideo: function(video) {
    for (var id in favorites) {
      if (favorites[id].youtube_id == video.youtube_id) {
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
      currentRoom = action.room.id;
      JukappStore.emitChange();
      break;

    case 'left-room':
      currentRoom = null;
      JukappStore.emitChange();
      break;

    case 'logged-in':
      user = action.user
      JukappStore.emitChange();
      break;

    case 'loaded-favorites':
      favorites = action.favorites;
      JukappStore.emitChange();
      break;

    case 'completed-search':
      searchResults = action.searchResults;
      JukappStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = JukappStore;
