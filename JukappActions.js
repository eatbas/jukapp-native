var Dispatcher = require('./Dispatcher');

var JukappActions = {
  joinRoom: function(roomId) {
    Dispatcher.dispatch({
      actionType: 'join-room',
      roomId: roomId
    })
  },

  leaveRoom: function() {
    Dispatcher.dispatch({
      actionType: 'leave-room'
    })
  },

  queueVideo: function(video) {
    Dispatcher.dispatch({
      actionType: 'queue-video',
      video: video
    })
  },

  login: function() {
    Dispatcher.dispatch({
      actionType: 'login'
    })
  },

  fetchFavorites: function(video) {
    Dispatcher.dispatch({
      actionType: 'fetch-favorites'
    })
  },

  favoriteVideo: function(video) {
    console.log('notimplementedyet');
  },
};

module.exports = JukappActions;
