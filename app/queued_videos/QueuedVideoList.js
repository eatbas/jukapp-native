var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');

var {
  Component
} = React;

class QueuedVideoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    return (
      <VideoList
        videos={JukappStore.getQueuedVideos()}
        loading={this.state.loading}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
}

module.exports = QueuedVideoList;
