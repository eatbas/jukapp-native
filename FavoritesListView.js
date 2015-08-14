'use strict';

var React = require('react-native');
var ApiListView = require("./ApiListView.js")

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

  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },

  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },

  render: function() {
    return (
      <ApiListView
        style={styles.container}
        url="/favorites"
        renderRow={(o) => this.renderRow(o)}
      />
    );
  }
});

var styles = StyleSheet.create({

  container: {
    padding: 10,
  }

});

module.exports = FavoritesListView
