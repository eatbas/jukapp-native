var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');

var {
  Component
} = React;

// TODO: Fetch videos on focus
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
        onFavoriteToggled={this.fetchData.bind(this)}
      />
    );
  }
}

module.exports = QueuedVideoList;
