'use strict';

var React = require('react-native');
var SearchBar = require('react-native-search-bar');
var VideoCell = require('./VideoCell.js')
var JukappStore = require('../stores/JukappStore');
var JukappActions = require('../../JukappActions');
var JukappApi = require('../JukappApi');

var {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var SearchResultsListView = React.createClass ({

  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

    console.log(JukappStore.getLastQuery())

    return {
      dataSource: dataSource.cloneWithRows(JukappStore.getSearchResults()),
      query: JukappStore.getLastQuery()
    };
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  _onChange: function() {
    this.setState({
      loading: false,
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getSearchResults())
    });
  },

  _refreshList: function() {
    JukappApi.searchVideo(this.state.query)
      .done((searchResults) => {
        JukappActions.completedSearch(searchResults, this.state.query);
      });
  },

  _renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} onFavoriteToggled={this._refreshList}/>
    )
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder='Search on YouTube'
          onSearchButtonPress={(query) => {
            this.setState({
              loading: true,
              query: query,
            })

            JukappApi.searchVideo(query)
              .done((searchResults) => {
                JukappActions.completedSearch(searchResults, query);
              });
          }}
          onCancelButtonPress={() => {
            console.log('onCancelButtonPress')
          }}
        />

        <ListView
          style={styles.listView}
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
          automaticallyAdjustContentInsets={false}
        />

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F2',
  },
  listView: {
    backgroundColor: '#EEF2F2',
    padding: 10,
  },
  listViewContent: {
    justifyContent: 'center',
  },
});

module.exports = SearchResultsListView
