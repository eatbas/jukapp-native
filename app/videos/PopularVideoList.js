var React = require('react-native');
var Dispatcher = require('../../Dispatcher');
var JukappStore = require('../stores/JukappStore');
var JukappApi = require('../JukappApi');
var VideoList = require('../videos/VideoList');

var {
  Component
} = React;

class PopularVideoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    JukappApi.addEventListener((operation) => {
      if (operation == 'play') {
        this.fetchData();
      }
    });

    JukappStore.addChangeListener(this._onChange.bind(this));

    this.fetchData();
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
    JukappApi.removeEventListener();
  }

  fetchData() {
    console.log('[PopularVideoList] fetching popularVideos');
    JukappApi.fetchPopularVideos().done((popularVideos) => {
      Dispatcher.dispatch({
        type: 'loadPopularVideos',
        popularVideos
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
        videos={JukappStore.getPopularVideos()}
        loading={this.state.loading}
        action={true}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
}

module.exports = PopularVideoList;
