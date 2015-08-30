var React = require('react-native');
var SearchIcon = require('../components/SearchIcon');
var Router = require('../navigation/Router');

var {
  Component,
  StyleSheet,
  TouchableHighlight,
  View
} = React;

class YoutubeSearchButton extends Component {
  _onPress() {
    Router.push('search', {});
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor='#33ADFF'
        activeOpacity={0.3}
        onPress={this._onPress}
      >
        <View>
          <SearchIcon />
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({

});

module.exports = YoutubeSearchButton;
