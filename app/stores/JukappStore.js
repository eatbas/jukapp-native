var React = require('react-native');
var Store = require('./Store');

var {
  AsyncStorage
} = React;

var currentRoom;
var user;
var favorites = [];
var rooms = [];
var searchResults = [];
var queuedVideos = [];
var lastQuery;


// HAS TO GO
var JUKAPP_STORAGE_KEY = '@JukappStorage:key';
var syncStorage = () => {
  var store = JSON.stringify({
    room: currentRoom,
    user
  });

  AsyncStorage.setItem(JUKAPP_STORAGE_KEY, store);
};

var JukappStore = new Store((register: Function) => {

  register({
    joinRoom(action) {
      currentRoom = action.room;
      syncStorage();
    },

    leaveRoom() {
      currentRoom = null;
      syncStorage();
    },

    login(action) {
      user = action.user;
      syncStorage();
    },

    logout() {
      user = null;
      syncStorage();
    },

    loadRooms(action) {
      rooms = action.rooms;
    },

    loadQueuedVideos(action) {
      queuedVideos = action.queuedVideos;
    },

    loadFavorites(action) {
      favorites = action.favorites;
    },

    loadSearchResults(action) {
      searchResults = action.searchResults;
      lastQuery = action.query;
    }
  });

  return {
    inRoom() {
      return !!currentRoom;
    },

    currentRoom() {
      return currentRoom;
    },

    loggedIn() {
      return !!user;
    },

    currentUser() {
      // try loggedIn()
      if (user) {
        return user;
      }
    },

    // HAS TO GO
    isFavoriteVideo(video) {
      for (var id in favorites) {
        if (favorites[id]['video'].youtube_id == video.youtube_id) {
          return true;
        }
      }

      return false;
    },

    // https://github.com/Shopify/shopify-native/blob/9c673cce1026b8f08ebe398ec894f08e83fd093f/app/stores/OrderFulfillmentLineItemsStore.js#L25
    // try get rooms()
    getRooms() {
      return rooms;
    },

    getSearchResults() {
      return searchResults;
    },

    getLastQuery() {
      return lastQuery;
    },

    getQueuedVideos() {
      return queuedVideos;
    },

    getFavorites() {
      return favorites;
    }
  };
});

module.exports = JukappStore;
