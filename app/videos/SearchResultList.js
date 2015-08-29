var React = require('react-native');
var SearchBar = require('react-native-search-bar');
var VideoListItem = require('../components/VideoListItem.js');
var JukappStore = require('../stores/JukappStore');
var Dispatcher = require('../../Dispatcher');
var JukappApi = require('../JukappApi');

var {
  Component,
  StyleSheet,
  View,
  ListView,
  ActivityIndicatorIOS
} = React;

class SearchResultsList extends Component {
  constructor(props) {
    super(props);

    // fix this
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

    this.state = {
      dataSource: dataSource.cloneWithRows(JukappStore.getSearchResults()),
      query: JukappStore.getLastQuery()
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
    JukappApi.searchVideo(this.state.query)
      .done((searchResults) => {
        Dispatcher.dispatch({
          type: 'loadSearchResults',
          searchResults,
          query: this.state.query
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
      <View style={styles.container}>
        <SearchBar
          placeholder='Search on YouTube'
          onSearchButtonPress={(query) => {
            this.setState({
              loading: true,
              query
            });

            JukappApi.searchVideo(query)
              .done((searchResults) => {
                Dispatcher.dispatch({
                  type: 'loadSearchResults',
                  searchResults,
                  query
                });
              });
          }}
          onCancelButtonPress={() => {
            console.log('onCancelButtonPress');
          }}
        />

        <ListView
          style={styles.listView}
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          automaticallyAdjustContentInsets={false}
        />

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 64,
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
