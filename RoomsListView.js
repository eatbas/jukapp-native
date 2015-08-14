'use strict';

var React = require('react-native');
var Jukapp = require('./Jukapp');

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

var RoomsListView = React.createClass ({

  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loading: false,
    };
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },

  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },

  componentDidMount: function() {
    Jukapp.fetch("/rooms")
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

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        underlayColor="#CFD6D6"
        style={{ marginBottom:10 }}
        onPress={() => {
          // Jukapp.joinRoom(room)
        }}>

        <View style={styles.cell}>
          <Text style={styles.title}>{rowData.name}</Text>
          <Text style={styles.details}>1234 USERS</Text>
        </View>
      </TouchableHighlight>
    )
  },

  renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  render: function() {
    return (
      <ListView
        style={styles.listView}
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
      />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#EEF2F2',
    padding: 10,
  },

  cell: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 6,
    height: 72,
    justifyContent: 'space-around',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 0
    },
    flex: 1,
  },

  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingTop: 4,
    paddingLeft: 10,
  },

  details: {
    color: '#9FA7A7',
    fontSize: 14,
    textAlign: 'left',
    paddingBottom: 4,
    paddingLeft: 10,
  },
});

module.exports = RoomsListView
