var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');
var VideoListItem = require('../videos/VideoListItem');
var PlayingVideoListItem = require('../videos/PlayingVideoListItem');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} = React;

class QueuedVideoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    console.log('[QueuedVideoList] fetching queuedVideos');
    JukappApi.fetchQueuedVideos().done((queuedVideos) => {
      Dispatcher.dispatch({
        type: 'loadQueuedVideos',
        queuedVideos
      });
    });
  }

  _onChange() {
    this.setState({
      loading: false
    });
  }

  _renderRow(video) {
    if (video.status == 'playing') {
      return <PlayingVideoListItem video={video} />;
    } else {
      return <VideoListItem video={video} />;
    }
  }

  render() {
    return (
      <VideoList
        videos={JukappStore.getQueuedVideos()}
        loading={this.state.loading}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}

module.exports = QueuedVideoList;
