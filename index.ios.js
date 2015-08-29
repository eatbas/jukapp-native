var React = require('react-native');
var RoomsListView = require('./app/rooms/RoomsListView');
var JukappStore = require('./app/stores/JukappStore');
var Navigation = require('./app/navigation/Navigation');

var {
  AppRegistry
} = React;

var Jukapp = React.createClass({
  getInitialState() {
    return {
      isInRoom: JukappStore.isInRoom()
    };
  },

  componentDidMount() {

    // should be done in room list view
    JukappStore.initialize();

    // should be mixin
    JukappStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      isInRoom: JukappStore.isInRoom()
    });
  },

  render() {
    if (!this.state.isInRoom) {
      return <RoomsListView />;
    }

    return (
      <Navigation />
    );
  }
});

AppRegistry.registerComponent('Jukapp', () => Jukapp);
