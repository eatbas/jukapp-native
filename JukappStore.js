var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var JUKAPP_URL = 'https://jukapp-api.herokuapp.com'
var CHANGE_EVENT = 'change';

var currentRoom;
var username;
var authToken;
var favorites = [];

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
// function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
//   var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
//   _todos[id] = {
//     id: id,
//     complete: false,
//     text: text
//   };
// }

function defaultOptions() {
  var options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (currentRoom) {
    options['headers']['X-Room-ID'] = currentRoom;
  }

  if (username && authToken) {
    options['headers']['X-Username'] = username;
    options['headers']['X-AuthToken'] = authToken;
  }

  return options;
}

function joinRoom(roomId) {
  return fetch(JUKAPP_URL + '/rooms/' + roomId + '/join', defaultOptions())
    .then((response) => {
      if (response.status == 200) {
        currentRoom = roomId
      } else {
        currentRoom = null
      }
    })
    .catch((response) => {
      currentRoom = null
      console.log('Join error', response)
      AlertIOS.alert('Join error' + response)
    });
}

function leaveRoom() {
  currentRoom = null
}

function queueVideo(video) {
  var options = defaultOptions();
  options['method'] = 'POST'
  options['body'] = JSON.stringify({
    youtube_id: video.youtube_id,
    title: video.title
  })

  return fetch(JUKAPP_URL + "/queue", options)
    .then((response) => {
      console.log(response.status);
      if (response.status == 201) {
        console.log('Successfully queued video')
      } else {
        console.log('Could not queue video')
      }
    })
    .catch((response) => {
      console.log("Queue error", response)
      AlertIOS.alert("Queue error" + response)
    });
}

function login() {
  username = 'berk'
  authToken = 'vbSFYuoGRcpaUSiAdyZM'
}

function fetchFavorites() {
  return fetch(JUKAPP_URL + "/favorites", defaultOptions())
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      favorites = responseData;
    })
    .catch((response) => {
      console.log("Queue error", response)
      AlertIOS.alert("Queue error" + response)
    });
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
// function update(id, updates) {
//   _todos[id] = assign({}, _todos[id], updates);
// }

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
// function updateAll(updates) {
//   for (var id in _todos) {
//     update(id, updates);
//   }
// }

// /**
//  * Delete a TODO item.
//  * @param  {string} id
//  */
// function destroy(id) {
//   delete _todos[id];
// }

// /**
//  * Delete all the completed TODO items.
//  */
// function destroyCompleted() {
//   for (var id in _todos) {
//     if (_todos[id].complete) {
//       destroy(id);
//     }
//   }
// }

var JukappStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  // areAllComplete: function() {
  //   for (var id in _todos) {
  //     if (!_todos[id].complete) {
  //       return false;
  //     }
  //   }
  //   return true;
  // },

  isInRoom: function() {
    return !!currentRoom
  },

  isLoggedIn: function() {
    return !!username && !!authToken;
  },

  isFavoriteVideo: function(video) {
    for (var id in favorites) {
      if (favorites[id].youtube_id == video.youtube_id) {
        return true;
      }
    }

    return false;
  },

  getCurrentRoom: function() {
    return currentRoom;
  },

  getFavorites: function() {
    return favorites;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  switch(action.actionType) {
    case 'join-room':
      joinRoom(action.roomId)
        .done(() => {
          JukappStore.emitChange();
        })
      break;

    case 'leave-room':
      leaveRoom();
      JukappStore.emitChange();
      break;

    case 'queue-video':
      queueVideo(action.video)
        .done(() => {
          JukappStore.emitChange();
        })
      break;

    case 'login':
      login()
      fetchFavorites()
        .done(() =>{
          JukappStore.emitChange();
        })
      break;

    case 'fetch-favorites':
      fetchFavorites()
        .done(() =>{
          JukappStore.emitChange();
        })
      break;

    default:
      // no op
  }
});

module.exports = JukappStore;
