'use strict';

var React = require('react-native');
var Jukapp = require('./Jukapp');
var VideoCell = require('./VideoCell.js')

var {
  StyleSheet,
  ListView,
  ActivityIndicatorIOS
} = React;

var ApiListView = React.createClass({

  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      hasMore: false,
      loading: false,
    };
  },

  componentDidMount: function() {
    this.refresh();
  },

  onEndReached: function() {
    console.log('end reached')
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} />
    )
  },

  refresh: function() {
    if(this.state.loading)
      return;

    this.setState({
      loading: true,
    });

    Jukapp.fetch(this.props.url)
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData)
        });
      })
      .done(() => {
        this.setState({
          loading: false
        })
      });
  },

  renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  render: function() {
    return (
      <ListView
        style={[styles.listView, this.props.style]}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.props.renderSectionHeader}
        renderFooter={this.renderFooter}
        onEndReached={this.onEndReached}
      />
    );
  }
});

var styles = StyleSheet.create({

  listView: {
    backgroundColor: '#EEF2F2',
  },

  listViewContent: {
    justifyContent: 'center',
  },

});


module.exports = ApiListView
