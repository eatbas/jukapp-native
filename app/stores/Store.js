var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../../Dispatcher');

var CHANGE_EVENT = 'change';
var ROOM_CHANGE_EVENT = 'room'; // TOFIX: remove this when removeListener is implemented

class Store extends EventEmitter {
  constructor(definition: Function) {
    super();

    var publicMethods = definition.call(this, (handlers) => {
      this.dispatchToken = Dispatcher.register((action) => {
        var handler = handlers[action.type];
        if (handler) {
          handler.call(this, action);
          this.changed();
        }
      });
    });

    for (var key in publicMethods) {
      Object.defineProperty(this, key, Object.getOwnPropertyDescriptor(publicMethods, key));
    }

    this.Watch = Store.watch(this);
  }

  addChangeListener(callback: Function) {
    this.addListener(CHANGE_EVENT, callback);
  }

  addRoomChangeListener(callback: Function) {
    // TOFIX: remove this when removeListener is implemented
    this.addListener(ROOM_CHANGE_EVENT, callback);
  }

  removeRoomChangeListener() {
    // TOFIX: remove this when removeListener is implemented
    this.removeAllListeners(ROOM_CHANGE_EVENT);
  }

  removeChangeListener() {
    // TOFIX: for some reason, this does not have its removeListener method.
    this.removeAllListeners(CHANGE_EVENT);
  }

  changed() {
    this.emit(CHANGE_EVENT);
    this.emit(ROOM_CHANGE_EVENT); // TOFIX: remove this when removeListener is implemented
  }

  static watch(store) {
    return {
      componentDidMount() {
        store.addRoomChangeListener(this._onChange);
      },

      componentWillUnmount() {
        store.removeRoomChangeListener(this._onChange);
      }
    };
  }
}

module.exports = Store;
