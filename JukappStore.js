var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;

// var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var JUKAPP_URL = "https://jukapp-api.herokuapp.com"
var CHANGE_EVENT = 'change';

var _todos = {};
var currentRoom;



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

function joinRoom(roomId) {
  var options = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  return fetch(JUKAPP_URL + "/rooms/" + roomId + "/join", options)
    .then((response) => {
      if (response.status == 200) {
        currentRoom = roomId
      } else {
        currentRoom = null
      }
    })
    .catch((response) => {
      currentRoom = null
      console.log("Join error", response)
      AlertIOS.alert("Join error" + response)
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

  getCurrentRoom: function() {
    return currentRoom;
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
  var text;

  switch(action.actionType) {
    case 'join-room':
      joinRoom(action.roomId)
        .done(() => {
          JukappStore.emitChange();
        })
      break;

    default:
      // no op
  }
});

module.exports = JukappStore;
