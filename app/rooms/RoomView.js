var React = require('react-native');
var JukappActions = require('../../JukappActions');
var JukappStore = require('../stores/JukappStore');
var VideoCell = require('../videos/VideoCell');
var JukappApi = require('../JukappApi');

var {
  Component,
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

class RoomView extends Component {

  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: dataSource.cloneWithRows(JukappStore.getQueuedVideos()),
      loading: true
    };
  }

  componentDidMount() {
    JukappApi.addEventListener((message) => {
      console.log(message);
      this._refreshList();
    });

    JukappStore.addChangeListener(this._onChange.bind(this));

    this._refreshList();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  }

  _refreshList() {
    JukappApi.fetchQueuedVideos().done(JukappActions.loadedQueuedVideos);
  }

  _onChange() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getQueuedVideos()),
      loading: false
    });
  }

  _renderRow(video) {
    return (
      <VideoCell video={video} onFavoriteToggled={this._refreshList.bind(this)} />
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
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
        contentInset={{ bottom: 0, top: 40 }}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EEF2F2'
  },

  listViewContent: {
    justifyContent: 'center'
  }
});

module.exports = RoomView;
