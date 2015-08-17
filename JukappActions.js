var Dispatcher = require('./Dispatcher');

var JukappActions = {
  joinRoom: function(roomId) {
    Dispatcher.dispatch({
      actionType: 'join-room',
      roomId: roomId
    })
  }
};

module.exports = JukappActions;
