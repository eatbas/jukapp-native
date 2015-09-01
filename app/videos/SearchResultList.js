var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');
var VideoList = require('./VideoList');

var {
  Component
} = React;

// TODO: Needs loading indicator
class SearchResultsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      loading: false
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      videos: JukappStore.getSearchResults(),
      loading: false
    });
  }

  fetchData() {
    JukappApi.searchVideo(JukappStore.getLastQuery())
      .done((searchResults) => {
        Dispatcher.dispatch({
          type: 'loadSearchResults',
          searchResults,
          query: JukappStore.getLastQuery()
        });
      });
  }

  render() {
    return (
      <VideoList
        videos={this.state.videos}
        loading={this.state.loading}
        onFavoriteToggled={this.fetchData.bind(this)}
        action={true}
      />
    );
  }
}

module.exports = SearchResultsList;
