var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Component
} = React;

class RoomsListView extends Component {

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
      <TouchableHighlight
        underlayColor="#CFD6D6"
        style={{ marginBottom:10 }}
        onPress={() => {
          JukappApi.joinRoom(room.id);
        }}>

        <View style={styles.cell}>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.details}>1234 USERS</Text>
        </View>
      </TouchableHighlight>
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
  },

  cell: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 6,
    height: 72,
    justifyContent: 'space-around',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 0
    },
    flex: 1
  },

  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 4,
    paddingLeft: 10
  },

  details: {
    color: '#9FA7A7',
    fontSize: 14,
    textAlign: 'left',
    paddingBottom: 4,
    paddingLeft: 10
  }
});

module.exports = RoomsListView;
