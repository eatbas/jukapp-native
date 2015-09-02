var React = require('react-native');
var JukappStore = require('../stores/JukappStore');
var VideoList = require('./VideoList');
var JukappApi = require('../JukappApi');
var Dispatcher = require('../../Dispatcher');

var {
  Component
} = React;

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

  search(query) {
    this.setState({loading: true});
    JukappApi.searchVideo(query)
      .done((searchResults) => {
        Dispatcher.dispatch({
          type: 'loadSearchResults',
          searchResults
        });
      });
  }

  render() {
    return (
      <VideoList
        videos={this.state.videos}
        loading={this.state.loading}
        action={true}
      />
    );
  }
}

module.exports = SearchResultsList;
