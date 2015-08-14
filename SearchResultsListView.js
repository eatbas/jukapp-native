'use strict';

var React = require('react-native');
var VideoCell = require('./VideoCell.js')
var ApiListView = require("./ApiListView.js")
var SearchBar = require('react-native-search-bar');

var {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Image,
 ListView,
 TouchableHighlight,
 ActivityIndicatorIOS
} = React;

class SearchResultsListView extends React.Component {

  renderRow(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} />
    )
  }

  _handleBackButtonPress() {
    this.props.navigator.pop();
  }

  _handleNextButtonPress() {
    this.props.navigator.push(nextRoute);
  }

  render() {
    return (
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder='Search on YouTube'
          onSearchButtonPress={() => {
            console.log('onSearchButtonPress')
          }}
          onCancelButtonPress={() => {
            console.log('onCancelButtonPress')
          }}
        />

        <ApiListView
          style={styles.listView}
          renderRow={(o) => this.renderRow(o)}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  searchContainer: {
      paddingVertical: 64,
      flex: 1
  },
  listView: {
    padding: 10,
  }
});

module.exports = SearchResultsListView
