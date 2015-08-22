'use strict';

var React = require('react-native');
var SearchResultsListView = require('./SearchResultsListView');
var FavoritesListView = require('./FavoritesListView');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var VideoCell = require('./VideoCell');
var JukappApi = require('./JukappApi');

var {
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  ActivityIndicatorIOS
} = React;

var RoomView = React.createClass({

  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: dataSource.cloneWithRows(JukappStore.getFavorites()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: true
    };
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
    if (this.state.isLoggedIn) {
      JukappApi.fetchFavorites();
    }
  },

  componentWillUnmount: function() {
    JukappStore.removeChangeListener(this._onChange);
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },

  _onChange: function() {


    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(JukappStore.getFavorites()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: false,
      video: JukappStore.getFavorites()[0]
    })
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <VideoCell video={rowData} />
    )
  },

  renderFooter: function() {
    if (this.state.loading) {
      return <ActivityIndicatorIOS />;
    }
  },

  render: function() {
    var image = null
    if (this.state.video) {
      image = {uri: 'http://img.youtube.com/vi/' + this.state.video.youtube_id + '/default.jpg' }
    }

    return (
      <View style={styles.cell}>
        <Image source={image} style={styles.videoImage}/>

        <View style={styles.rowData}>

          <View style={styles.rowCell}>
            <Text style={styles.number}>6</Text>
            <Text style={styles.numberLabel}>SHARES</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.rowCell}>
            <Text style={styles.number}>16,345</Text>
            <Text style={styles.numberLabel}>VIEWS</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.rowCell}>
            <Text style={styles.number}>48</Text>
            <Text style={styles.numberLabel}>ORDERS</Text>
          </View>

        </View>

        <ListView
          style={styles.container}
          contentContainerStyle={styles.listViewContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EEF2F2',
  },

  listViewContent: {
    justifyContent: 'center',
  },

  cell: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 70,
  },

  rowData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },

  rowCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 115
  },

  separator: {
    width: 1,
    height: 35,
    backgroundColor: '#CFD6D6',
  },

  number: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',

  },

  numberLabel: {
    color: '#9FA7A7',
    fontSize: 12,
    textAlign: 'center'
  },

  videoImage: {
    alignSelf: 'center',
    width: 192,
    height: 192,
  },
});

module.exports = RoomView
