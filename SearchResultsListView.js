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
 ActivityIndicatorIOS,
 TextInput
} = React;

class SearchResultsListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: null,
    };
  }

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

    if (this.state.query !== null) {
      var url = "/search?query=" + this.state.query
      var searchResults =
        <ApiListView
            style={styles.listView}
            url={url}
            renderRow={(o) => this.renderRow(o)}
            automaticallyAdjustContentInsets={false}
        />
    }

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder='Search on YouTube'
          onChangeText={(text) => {
            this.state.tempQuery = text
          }}
          onSearchButtonPress={() => {
            console.log('onSearchButtonPress')
            this.setState({
              query: this.state.tempQuery,
              isLoading: true
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
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 64,
  },
  listView: {
    padding: 10,
  }
});

module.exports = SearchResultsListView
