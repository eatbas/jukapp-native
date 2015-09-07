var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');

var {
  Component,
  View,
  Text,
  ScrollView
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

  render() {
    var videos = JukappStore.getQueuedVideos();
    var playing = videos.find((v) => v.status == 'playing');
    // console.log(videos, playing);

    if (playing) {
      var nowPlayingTile = (
        <View style={{
          marginTop: 20,
          height: 128,
          backgroundColor: 'white'
        }}>
          <Text style={{color: 'black', fontSize: 32}}>
            {playing.title}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={{flex: 1, backgroundColor: '#EEF2F2'}} automaticallyAdjustContentInsets={false}>
        {nowPlayingTile}
        <VideoList
          videos={JukappStore.getQueuedVideos()}
          loading={this.state.loading}
          automaticallyAdjustContentInsets={!playing}
        />
      </ScrollView>
    );
  }
}

module.exports = QueuedVideoList;
