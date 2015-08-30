var React = require('react-native');
var VideoListItem = require('../components/VideoListItem.js');
var JukappStore = require('../stores/JukappStore');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');

var {
  Component,
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

class SearchResultsList extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource
    };
  }

  componentDidMount() {
    JukappStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    JukappStore.removeChangeListener(this._onChange);
  }

  _renderFooter() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  }

  _onChange() {
    this.setState({
      loading: false,
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getSearchResults())
    });
  }

  _refreshList() {
    JukappApi.searchVideo(JukappStore.getLastQuery())
      .done((searchResults) => {
        Dispatcher.dispatch({
          type: 'loadSearchResults',
          searchResults,
          query: JukappStore.getLastQuery()
        });
      });
  }

  _renderRow(video) {
    return (
      <VideoListItem video={video} onFavoriteToggled={this._refreshList.bind(this)}/>
    );
  }

  render() {
    return (
        <ListView
          style={styles.listView}
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
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#EEF2F2'
  },

  listView: {
    backgroundColor: '#EEF2F2',
    padding: 10
  },

  listViewContent: {
    justifyContent: 'center'
  }
});

module.exports = SearchResultsList;
