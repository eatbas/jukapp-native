var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../../Dispatcher');

var CHANGE_EVENT = 'change';

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

  removeChangeListener() {
    // TOFIX: for some reason, this does not have its removeListener method.
    this.removeAllListeners(CHANGE_EVENT);
  }

  changed() {
    this.emit(CHANGE_EVENT);
  }

  static watch(store) {
    return {
      componentDidMount() {
        store.addChangeListener(this._onChange);
      },

      componentWillUnmount() {
        store.removeChangeListener(this._onChange);
      }
    };
  }
}

module.exports = Store;
