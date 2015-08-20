'use strict';

var React = require('react-native');
var SearchBar = require('react-native-search-bar');
var VideoCell = require('./VideoCell.js')
var JukappStore = require('./JukappStore');
var JukappApi = require('./JukappApi');

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

    return {
      dataSource: dataSource.cloneWithRows(JukappStore.getSearchResults())
    };
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} />
    )
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder='Search on YouTube'
          onSearchButtonPress={(query) => {
            this.setState({loading: true});
            JukappApi.searchVideo(query);
          }}
          onCancelButtonPress={() => {
            console.log('onCancelButtonPress')
          }}
        />

        <ListView
          style={styles.listView}
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          automaticallyAdjustContentInsets={false}
        />

      </View>
    );
  },

  _onChange: function() {
    this.setState({
      loading: false,
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getSearchResults())
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F2',
    marginTop: 64,
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
