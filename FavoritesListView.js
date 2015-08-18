'use strict';

var React = require('react-native');
var JukappActions = require('./JukappActions');
var JukappStore = require('./JukappStore');
var VideoCell = require('./VideoCell.js')

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

var FavoritesListView = React.createClass ({
  getInitialState: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: dataSource.cloneWithRows(JukappStore.getFavorites()),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: true
    }
  },

  componentDidMount: function() {
    JukappStore.addChangeListener(this._onChange);
    // JukappActions.fetchFavorites();
  },

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
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
    if (!this.state.isLoggedIn) {
      return (
        <View style={styles.login}>
          <TouchableHighlight
            underlayColor="#66BB6A"
            style={styles.button}
            onPress={() => {
              JukappActions.login()
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.listViewContent}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
      />
    );
  },

  _onChange: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        JukappStore.getFavorites()
      ),
      isLoggedIn: JukappStore.isLoggedIn(),
      loading: false
    })
  },
});

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EEF2F2',
  },

  listViewContent: {
    justifyContent: 'center',
  },

  login: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});

module.exports = FavoritesListView
