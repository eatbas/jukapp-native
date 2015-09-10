var Store = require('./Store');

var currentRoom;
var user;
var favorites = [];
var rooms = [];
var searchResults = [];
var queuedVideos = [];

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
      favorites = [];
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
      return user;
    },

    getRooms() {
      return rooms;
    },

    getSearchResults() {
      return searchResults;
    },

    getQueuedVideos() {
      return queuedVideos;
    },

    getFavorites() {
      return favorites;
    },

    isFavorite(youtubeId) {
      return favorites.find((favorite) => favorite.youtubeId == youtubeId);
    }
  };
});

module.exports = JukappStore;
