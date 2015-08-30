var React = require('react-native');

var {
  Icon
} = require('react-native-icons');

var {
  Component,
  StyleSheet
} = React;

class YoutubeSearchButton extends Component {
  render() {
    return (
      <Icon
        name='fontawesome|search'
        size={20}
        color='black'
        style={styles.headerLeftButtonIcon}
      />
    );
  }
}

var styles = StyleSheet.create({
  headerLeftButtonIcon: {
    width: 100,
    height: 20,
    marginTop: 10,
    marginLeft: 20
  }
});

module.exports = YoutubeSearchButton;
