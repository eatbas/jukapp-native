var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var RoomListItem = require('./RoomListItem');

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
    JukappApi.fetchRooms();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getRooms()),
      loading: false
    });
  }

  _renderRow(room) {
    return (
      <RoomListItem
        room={room}
        onPress={() => {
          JukappApi.joinRoom(room.id);
        }}
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
        renderRow={this._renderRow}
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
