var React = require('react-native');
var RoomList = require('./app/rooms/RoomList');
var JukappStore = require('./app/stores/JukappStore');
var Navigation = require('./app/navigation/Navigation');
var JukappStorage = require('./JukappStorage');

var {
  AppRegistry,
  StatusBarIOS
} = React;

var Jukapp = React.createClass({
  mixins: [JukappStore.Watch],

  getInitialState() {
    StatusBarIOS.setStyle('light-content');

    return {
      inRoom: JukappStore.inRoom()
    };
  },

  componentDidMount() {
    setTimeout(() => {
      // KNOWN ISSUE: ScrollView sometimes errs with "Cannot find view with tag #XXX": #1941
      // https://github.com/facebook/react-native/issues/1941
      JukappStorage.loadFromStorage();
    }, 100);
  },

  _onChange() {
    this.setState({
      inRoom: JukappStore.inRoom()
    });
  },

  render() {
    if (!this.state.inRoom) {
      return <RoomList />;
    }

    return (
      <Navigation />
    );
  }
});

AppRegistry.registerComponent('Jukapp', () => Jukapp);
