'use strict';

var React = require('react-native');
var SearchBar = require('react-native-search-bar');
var Jukapp = require('./Jukapp');
var VideoCell = require('./VideoCell.js')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput
} = React;

var SearchResultsListView = React.createClass ({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      query: null,
    };
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },

  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
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
    if (this.state.query !== null) {
      var searchResults =
        <ListView
          style={styles.listView}
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          automaticallyAdjustContentInsets={false}
        />
    }

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder='Search on YouTube'
          onSearchButtonPress={(text) => {
            var url = "/search?query=" + text
            Jukapp.fetch(url)
              .then((responseData) => {
                this.setState({
                  query: url,
                  dataSource: this.state.dataSource.cloneWithRows(responseData["videos"])
                });
              })
              .done(() => {
                this.setState({
                  loading: false
                })
              });
          }}
          onCancelButtonPress={() => {
            console.log('onCancelButtonPress')
          }}
        />

        {searchResults}

      </View>
    );
  }
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
