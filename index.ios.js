var React = require('react-native');
var RoomsListView = require('./app/rooms/RoomsListView');
var JukappStore = require('./app/stores/JukappStore');
var Navigation = require('./app/navigation/Navigation');
var Dispatcher = require('./Dispatcher');

var {
  AppRegistry
} = React;

var Jukapp = React.createClass({
  mixins: [JukappStore.Watch],

  getInitialState() {
    return {
      inRoom: JukappStore.inRoom()
    };
  },

  componentDidMount() {
    // should be done in room list view
    Dispatcher.dispatch({
      type: 'initialize'
    });
  },

  _onChange() {
    this.setState({
      inRoom: JukappStore.inRoom()
    });
  },

  render() {
    if (!this.state.inRoom) {
      return <RoomsListView />;
    }

    return (
      <Navigation />
    );
  }
});

AppRegistry.registerComponent('Jukapp', () => Jukapp);
