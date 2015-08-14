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

class FavoritesListView extends React.Component {

  _handleBackButtonPress() {
    this.props.navigator.pop();
  }

  _handleNextButtonPress() {
    this.props.navigator.push(nextRoute);
  }

  render() {
    return (
      <ApiListView
        style={styles.container}
        url="/favorites"
        renderRow={(o) => this.renderRow(o)}
      />
    );
  }
}

var styles = StyleSheet.create({

  container: {
    padding: 10,
  }

});

module.exports = FavoritesListView
