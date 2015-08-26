var Dispatcher = require('./Dispatcher');

var JukappActions = {
  loadedRooms: function(rooms) {
    Dispatcher.dispatch({
      actionType: 'loaded-rooms',
      rooms: rooms
    });
  },

  joinedRoom: function(room) {
    Dispatcher.dispatch({
      actionType: 'joined-room',
      room: room
    });
  },

  leftRoom: function() {
    Dispatcher.dispatch({
      actionType: 'left-room'
    });
  },

  loggedIn: function(user) {
    Dispatcher.dispatch({
      actionType: 'logged-in',
      user: user
    });
  },

  loggedOut: function(user) {
    Dispatcher.dispatch({
      actionType: 'logged-out'
    });
  },

  loadedQueuedVideos: function(queuedVideos) {
    Dispatcher.dispatch({
      actionType: 'loaded-queued-videos',
      queuedVideos: queuedVideos
    });
  },

  loadedFavorites: function(favorites) {
    Dispatcher.dispatch({
      actionType: 'loaded-favorites',
      favorites: favorites
    });
  },

  completedSearch: function(searchResults) {
    Dispatcher.dispatch({
      actionType: 'completed-search',
      searchResults: searchResults
    });
  }
};

module.exports = JukappActions;
