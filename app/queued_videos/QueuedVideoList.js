var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var VideoListItem = require('../components/VideoListItem');
var JukappApi = require('../JukappApi');

var {
  Component,
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

class QueuedVideoList extends Component {

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
      this.fetchData();
    });

    JukappStore.addChangeListener(this._onChange.bind(this));

    this.fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  }

  fetchData() {
    JukappApi.fetchQueuedVideos().done((queuedVideos) => {
      Dispatcher.dispatch({
        type: 'loadQueuedVideos',
        queuedVideos
      });
    });
  }

  _onChange() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getQueuedVideos()),
      loading: false
    });
  }

  _renderRow(video) {
    return (
      <VideoListItem video={video} onFavoriteToggled={this.fetchData.bind(this)} />
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

module.exports = QueuedVideoList;
