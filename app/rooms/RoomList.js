var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var RoomListItem = require('./RoomListItem');
var Dispatcher = require('../../Dispatcher');
var JukappStorage = require('../../JukappStorage');

var {
  StyleSheet,
  ListView,
  ActivityIndicatorIOS,
  Component
} = React;

class RoomList extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: dataSource.cloneWithRows(JukappStore.getRooms()),
      loading: true
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
    this.fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  fetchData() {
    JukappApi.fetchRooms()
      .then((rooms) => {
        return Dispatcher.dispatch({type: 'loadRooms', rooms});
      });
  }

  _onChange() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getRooms()),
      loading: false
    });
  }

  _onPress(room) {
    JukappApi.joinRoom(room.id)
      .then((room) => {
        console.log('joinRoom')
        Dispatcher.dispatch({
          type: 'joinRoom',
          room
        });

        JukappStorage.setItem('room', room);
      })
      .catch((err) => {
        Dispatcher.dispatch({
          type: 'leaveRoom'
        });
        console.log('[RoomList] Join room error', err);
      });
  }

  _renderRow(room) {
    return (
      <RoomListItem
        room={room}
        onPress={this._onPress.bind(this)}
      />
    );
  }

  _renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  render() {
    return (
      <ListView
        style={styles.listView}
        renderRow={this._renderRow.bind(this)}
        dataSource={this.state.dataSource}
        renderFooter={this._renderFooter.bind(this)}
      />
    );
  }
}

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#EEF2F2',
    padding: 10
  }
});

module.exports = RoomList;
