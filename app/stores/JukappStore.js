var Store = require('./Store');

var currentRoom;
var user;
var favorites = [];
var rooms = [];
var searchResults = [];
var queuedVideos = [];
var lastQuery;

var JukappStore = new Store((register: Function) => {
  register({
    joinRoom(action) {
      currentRoom = action.room;
    },

    leaveRoom() {
      currentRoom = null;
    },

    login(action) {
      user = action.user;
    },

    logout() {
      user = null;
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
